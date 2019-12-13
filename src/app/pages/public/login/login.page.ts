import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: []
})
export class loginPage implements OnInit {
  submitted = false ;
  loginObj = {} ;
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.loginObj['phone'] = localStorage.getItem('phone');
  }

  async onSubmit(form) {
    this.submitted = true;
    if(form.form.invalid){
      return;
    }
    else{
      console.log("Next Navigation")  
      this.router.navigate(["home"]);
    }
  }

  async forgotPassword() {
      this.router.navigate(["forgotpassword"]);
  }
}
