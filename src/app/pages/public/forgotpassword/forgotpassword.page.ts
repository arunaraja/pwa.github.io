import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {$} from 'jquery'
declare var $ : any;

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html'
})
export class forgotpasswordPage implements OnInit {
  submitted = false ;
  invalidOTP = false ;
  loginObj = {} ;
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.clear();
    this.loginObj['phone'] = "+1";
    this.click();
  }

  async onSubmit(form) {
    this.invalidOTP = false ;
    this.submitted = true;
    if(form.form.invalid){
      return;
    }
    var otp1 = $("#forgotInput1").val()+""+$("#forgotInput2").val()+""+$("#forgotInput3").val()+""+$("#forgotInput4").val()+""+$("#forgotInput5").val()+""+$("#forgotInput6").val(); 
        if(otp1.length<6){
            this.invalidOTP = true;
            return;
        }
    else{
      this.router.navigate(["changepassword"]);
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


}
