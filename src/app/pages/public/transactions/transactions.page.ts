import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: []
})
export class transactionPage implements OnInit {
  submitted = false ;
  openNavBar = false;
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    document.getElementById("mySidenav").style.width = "0";
  }

    logOut(){
    this.router.navigate(["logout"]); 
  }
transaction(){
    this.router.navigate(["transactions"]); 
  }
home(){
    this.router.navigate(["home"]); 
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
}
