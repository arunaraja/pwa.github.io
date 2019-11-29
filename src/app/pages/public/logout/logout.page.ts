import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: []
})
export class logoutPage implements OnInit {
  submitted = false ;
  changePasswordObj = {} ;
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.clear();
  }

  async logIn() {
    this.router.navigate(["login"]);
}

  
}
