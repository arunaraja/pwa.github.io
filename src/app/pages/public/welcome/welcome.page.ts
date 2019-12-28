import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare var $ : any;

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: []
})
export class welcomePage implements OnInit {
  submitted = false ;
  welcomeObj = {phone:""} ;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    this.welcomeObj['phone'] = "+1";
  }
  
  async onSubmit(form) {
    this.submitted = true;
    if(form.form.invalid){
      return;
    }
    else{
      localStorage.setItem('phone',this.welcomeObj['phone'] );
      this.router.navigate(["verify"]);
    }
  }
}
