import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: []
})
export class forgotpasswordPage implements OnInit {
  submitted = false ;
  loginObj = {} ;
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
      this.router.navigate(["changepassword"]);
    }
  }
}
