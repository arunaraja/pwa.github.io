import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {$} from 'jquery'
declare var $ : any;

@Component({
  selector: 'app-sendconfirmation',
  templateUrl: './sendmoneyconfirmation.page.html',
  styleUrls: []
})
export class sendmoneyconfirmationPage implements OnInit {
  submitted = false ;
  openNavBar = false;
  nextPage = false;
  firstPage = true;
  sendMoneyObj = {};
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    // document.getElementById("mySidenav").style.width = "0";
  }

  async onSubmit(form) {
    this.submitted = true;
    if(form.form.invalid){
      return;
    }
    else{
      console.log("Next Navigation")  
      this.router.navigate(["register"]);
    }
  }

  openNav() {
    if(!this.openNavBar){
      this.openNavBar = true;
      // document.getElementById("mySidenav").style.width = "250px";
      document.getElementById("column").style.opacity = "45%";
    }
    else{
      this.openNavBar = false;
      // document.getElementById("mySidenav").style.width = "0";
      document.getElementById("column").style.opacity = "1";
    }
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
  sendMoney(){
    this.router.navigate(["sendmoney"]); 
  }
  settings(){
    this.router.navigate(["settings"]); 
  }
  wallet(){
    this.router.navigate(["managewallet"]); 
  }
  onClickSend(){
    this.router.navigate(["sendmoney"]); 
  }
  onClickMsg(){
    this.router.navigate(["sendmessage"]); 
  }
}
