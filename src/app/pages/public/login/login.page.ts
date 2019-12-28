import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './../../../services/api/api.service'
import { environment } from "./../../../../environments/environment";
import {$} from 'jquery'
declare var $ : any;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: []
})
export class loginPage implements OnInit {
  submitted = false ;
  baseUrl = environment.baseUrl;
  invalidOTP = false ;
  invalidOTPPhone = false ;
  loginObj = {phone:""} ;

  constructor(
    private router: Router ,private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginObj['phone'] = "+1";
    this.click();
  }

  async onSubmit(form) {
    this.submitted = true;
    this.invalidOTP = false;
    this.invalidOTPPhone = false;
    if(form.form.invalid){
      return;
    }
    else{
      var otp1 = $("#loginInput1").val()+""+$("#loginInput2").val()+""+$("#loginInput3").val()+""+$("#loginInput4").val(); 
        if(otp1.length<4){
            this.invalidOTP = true;
            return;
        }
        this.authService.post(this.baseUrl+"/api/user/loginUser",{phoneNumber:this.loginObj['phone'],pin:otp1}).subscribe((res) => {
            if(res['data']){
                localStorage.setItem("phone",this.loginObj['phone']);
                localStorage.setItem("profileId",res['data'].profileId);
                localStorage.setItem("firstName",res['data'].firstName);
                localStorage.setItem("lastName",res['data'].lastName);
                localStorage.setItem("vendorCustomerId",res['data'].vendorCustomerId);
                localStorage.setItem("phoneNumber",res['data'].phoneNumber);
                this.router.navigate(["home"]);
            }
            else{
              this.invalidOTPPhone = true;
              return;
            }
            }, (error) => {
            console.log(error);
            });
    }
  }
  click(){
    this.invalidOTP = false ;
    var charLimit = 1;
    $(".inputs").keydown(function(e) {
        var keys = [8, 9, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40,48, 45, 46, 144, 145];
        if (e.which == 8 && this.value.length == 0) {
            $(this).prev('.inputs').focus();
        } else if ($.inArray(e.which, keys) >= 0) {
            return true;
        } else if (this.value.length >= charLimit) {
            $(this).next('.inputs').focus();
            return false;
        } else if (e.shiftKey || e.which <= 48 || e.which >= 58) {
            return false;
        }
    }).keyup (function () {
        if (this.value.length >= charLimit) {
            $(this).next('.inputs').focus();
            return false;
        }
    });
  }
  async forgotPassword() {
      this.router.navigate(["forgotpassword"]);
  }
}
