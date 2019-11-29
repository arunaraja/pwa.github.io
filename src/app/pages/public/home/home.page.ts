import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: []
})

export class homePage implements OnInit {
  submitted = false ;
  loginObj = {} ;
  openNavBar = false;
  gridView = true;
  listView = false;
  
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.gridView = true;
    document.getElementById("mySidenav").style.width = "0";
  }
  
  async onSubmit(form) {
    this.router.navigate(["logout"]); 
  }

  logOut(){
    this.router.navigate(["logout"]); 
  }
home(){
    this.router.navigate(["home"]); 
  }
  transaction(){
    this.router.navigate(["transactions"]); 
  }

  listViewFunc(){
    this.gridView = false;
    this.listView = true;
  }

  gridViewFunc(){
    this.gridView = true;
    this.listView = false;
  }

  openNav() {
    if(!this.openNavBar){
      this.openNavBar = true;
      document.getElementById("mySidenav").style.width = "250px";
      document.getElementById("column").style.opacity = "45%";
    }
    else{
      this.openNavBar = false;
      document.getElementById("mySidenav").style.width = "0";
      document.getElementById("column").style.opacity = "1";
    }
  }
}
