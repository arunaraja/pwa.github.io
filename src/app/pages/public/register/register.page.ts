import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './../../../services/api/api.service'
import { environment } from "./../../../../environments/environment";
import {$} from 'jquery'
declare var $ : any;

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: []
})
export class registerPage implements OnInit {
  submitted = false ;
  baseUrl = environment.baseUrl;
  otpMismatch = false ;
  alreadyRegisterd = false ;
  invalidOTP = false ;
  invalidConfOTP = false ;
  mobileNo = localStorage.getItem('phone');
  registrationObj = {phone:""} ;
  constructor(
    private router: Router, private authService: AuthService
  ) {}

  ngOnInit() {
    this.registrationObj['phone'] = localStorage.getItem('phone');
    this.click();
    this.click1();
  }

  async onSubmit(form) {
    this.submitted = true;
    
    this.invalidOTP = false;
    this.alreadyRegisterd = false;
    this.invalidConfOTP = false;
    this.otpMismatch = false;
    if(form.form.invalid){
      return;
    }
    else{
        var otp1 = $("#registerInput1").val()+""+$("#registerInput2").val()+""+$("#registerInput3").val()+""+$("#registerInput4").val(); 
        var otp2 = $("#registerInputConf1").val()+""+$("#registerInputConf2").val()+""+$("#registerInputConf3").val()+""+$("#registerInputConf4").val(); 
        if(otp1.length<4){
            this.invalidOTP = true;
            return;
        }
        if(otp2.length<4){
            this.invalidConfOTP = true;
            return;
        }
        if(otp1 !== otp2){
            this.otpMismatch = true;
            return;
        }
        this.authService.post(this.baseUrl+"/api/user/registerUser",{phoneNumber:this.mobileNo,pin:otp1}).subscribe((res) => {
            if(res['status'] === 200 && res['internalMessage'] === 'USER_REGISTRATION_SUCCESSFUL'){
                this.router.navigate(["thankyou"]);
            }
            if(res['status'] === 500 && res['internalMessage'] === 'USER_IS_ACTIVE'){
               this.alreadyRegisterd = true;
            }
            }, (error) => {
            console.log(error);
            });      
    }
      
  }
  click(){
    this.invalidOTP = false ;
    this.invalidConfOTP = false;
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
  click1(){
    this.invalidOTP = false ;
    this.invalidConfOTP = false;
    var charLimit = 1;
    $(".inputs1").keydown(function(e) {
        var keys = [8, 9, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40,48, 45, 46, 144, 145];
        if (e.which == 8 && this.value.length == 0) {
            $(this).prev('.inputs1').focus();
        } else if ($.inArray(e.which, keys) >= 0) {
            return true;
        } else if (this.value.length >= charLimit) {
            $(this).next('.inputs1').focus();
            return false;
        } else if (e.shiftKey || e.which <= 48 || e.which >= 58) {
            return false;
        }
    }).keyup (function () {
        if (this.value.length >= charLimit) {
            $(this).next('.inputs1').focus();
            return false;
        }
    });
  }

}
