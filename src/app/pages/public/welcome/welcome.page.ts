import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: []
})
export class welcomePage implements OnInit {
  submitted = false ;
  welcomeObj = {} ;
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
  }
  
  async onSubmit(form) {
    this.submitted = true;
    if(form.form.invalid){
      return;
    }
    else{
      console.log("Next Navigation")  
      this.router.navigate(["verify"]);
    }
  }
}
