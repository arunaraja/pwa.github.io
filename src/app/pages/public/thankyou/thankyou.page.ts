import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.page.html',
  styleUrls: []
})
export class thankyouPage implements OnInit {
  submitted = false ;
  changePasswordObj = {} ;
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.clear();
  }

  async onSubmit(form) {
    this.router.navigate(["login"]); 
  }
}
