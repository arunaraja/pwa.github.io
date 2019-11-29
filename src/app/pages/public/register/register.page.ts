import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: []
})
export class registerPage implements OnInit {
  submitted = false ;
  registrationObj = {} ;
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.clear();
  }

  async onSubmit(form) {
    this.submitted = true;
    if(form.form.invalid){
      return;
    }
    else{
      console.log("Next Navigation")  
      this.router.navigate(["thankyou"]);
    }
      
  }

}
