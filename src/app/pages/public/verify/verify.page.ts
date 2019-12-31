import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './../../../services/api/api.service'
import { environment } from "./../../../../environments/environment";
import {$} from 'jquery'
declare var $ : any;

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html'
})
export class verifyPage implements OnInit {
  submitted = false ;
  alreadyVerified = false ;
  verifyNoOtp = false ;
  verifyInvalidOtp = false ;
  matchOtp = true ;
   mobileNo = localStorage.getItem('phone');
  baseUrl = environment.baseUrl;
  loginObj = {} ;
  constructor(
    private router: Router  , private authService: AuthService
  ) {}

  ngOnInit() {
    
    this.loginObj['phone'] = this.mobileNo;
    if(this.mobileNo){
      this.authService.post(this.baseUrl+"/api/utility/createRefCode",{phoneNumber:this.mobileNo}).subscribe((res) => {
        if(res['data']){4
          if(res['data'].code === "Already Verified"){
            this.alreadyVerified = true;
            return;
          }  
        }
        }, (error) => {
        console.log(error);
        });
    }
    this.click();
  }

  callChange(){
    this.matchOtp = true ;
    this.verifyInvalidOtp = false ;
  }

  async onSubmit(form) {
    this.verifyInvalidOtp = false ;
    this.submitted = true;
    if(form.form.invalid){
      return;
    }
    else{
      var otp = $("#verifyInput1").val()+""+$("#verifyInput2").val()+""+$("#verifyInput3").val()+""+$("#verifyInput4").val()+""+$("#verifyInput5").val()+""+$("#verifyInput6").val();
      if(otp.length<=0){
        console.log("otp.length")
        console.log(otp.length)
        this.verifyNoOtp = true;
        return;
      }
      if(otp.length<6){
        this.verifyInvalidOtp = true;
        return;
      }
      this.verifyInvalidOtp = false;
      this.authService.post(this.baseUrl+"/api/utility/validateRefCode",{phoneNumber:this.mobileNo,referenceCode:otp}).subscribe((res) => {
        if(res['data']){
          console.log(res['data'])
        if(res['status'] === 200 && ( res['data'].result  === "Reference Code Matched")){
          this.matchOtp = true;
          this.router.navigate(["register"]);
        }
        else{
          this.matchOtp = false;
        }
        }
        }, (error) => {
        console.log(error);
        });
     
    }
  }

  click(){
    console.log("HIT>>>>>>")
    this.matchOtp = true ;
    this.verifyInvalidOtp = false ;
    var charLimit = 1;
    $(".inputs").keydown(function(e) {
        var keys = [8, 9, 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46,48, 144, 145];
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


}
