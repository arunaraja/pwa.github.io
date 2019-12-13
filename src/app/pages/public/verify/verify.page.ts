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
    else if(!this.loginObj['digit1'] || !this.loginObj['digit2']|| !this.loginObj['digit3'] || !this.loginObj['digit4']
      || !this.loginObj['digit5'] || !this.loginObj['digit6']){
        this.invalidOTP = true;
    }
    else{
      this.router.navigate(["register"]);
    }
  }

  click(){
    this.invalidOTP = false ;
    $('.digit-group').find('input').each(function() {
    $(this).attr('maxlength', 1);
    $(this).on('keyup', function(e) {
      console.log("HIT????")
      // if(!isNaN(e.originalEvent.key))
      // {
      var parent = $($(this).parent());
      
      if(e.keyCode === 8 || e.keyCode === 37) {
        var prev = parent.find('input#' + $(this).data('previous'));
        
        if(prev.length) {
          $(prev).select();
        }
      } else if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
        var next = parent.find('input#' + $(this).data('next'));
        
        if(next.length) {
          $(next).select();
        } else {
          if(parent.data('autosubmit')) {
            parent.submit();
          }
        // }
        }
      }
    });
  });
  }


}
