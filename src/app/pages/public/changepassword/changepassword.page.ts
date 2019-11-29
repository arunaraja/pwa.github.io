import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: []
})
export class changePasswordPage implements OnInit {
  submitted = false ;
  changePasswordObj = {} ;
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.clear();
  }

  async onSubmit(form) {
    this.submitted = true;
    if(form.form.invalid)
      return;
    else
      this.router.navigate(["changepasssuccess"]); 
  }
}
