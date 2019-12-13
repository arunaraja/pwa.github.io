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
      this.router.navigate(["changepassword"]);
    }
  }

  // click(){
  //   this.invalidOTP = false ;
  //   $('.digit-group').find('input').each(function() {
  //   $(this).attr('maxlength', 1);
  //   $(this).on('keyup', function(e) {
  //     console.log("HIT????")
  //     // if(!isNaN(e.originalEvent.key))
  //     // {
  //     var parent = $($(this).parent());
      
  //     if(e.keyCode === 8 || e.keyCode === 37) {
  //       var prev = parent.find('input#' + $(this).data('previous'));
        
  //       if(prev.length) {
  //         $(prev).select();
  //       }
  //     } else if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
  //       var next = parent.find('input#' + $(this).data('next'));
        
  //       if(next.length) {
  //         $(next).select();
  //       } else {
  //         if(parent.data('autosubmit')) {
  //           parent.submit();
  //         }
  //       // }
  //       }
  //     }
  //   });
  // });
  // }

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
