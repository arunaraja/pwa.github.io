import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {$} from 'jquery'
declare var $ : any;

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html'
})
export class verifyPage implements OnInit {
  submitted = false ;
  invalidOTP = false ;
  loginObj = {} ;
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.loginObj['phone'] = localStorage.getItem('phone');
    this.click();
  }

  async onSubmit(form) {
    this.invalidOTP = false ;
    this.submitted = true;
    if(form.form.invalid){
      return;
    }
    // else if(!this.loginObj['digit1'] || !this.loginObj['digit2']|| !this.loginObj['digit3'] || !this.loginObj['digit4']
    //   || !this.loginObj['digit5'] || !this.loginObj['digit6']){
    //     this.invalidOTP = true;
    // }
    else{
      this.router.navigate(["register"]);
    }
  }

  click(){
    this.invalidOTP = false ;
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
