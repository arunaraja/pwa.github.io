import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './../../../services/api/api.service'
import { environment } from "./../../../../environments/environment";
import {$} from 'jquery'
declare var $ : any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: []
})

export class homePage implements OnInit {
  baseUrl = environment.baseUrl;
  submitted = false ;
  loginObj = {} ;
  homeArr = [];
  firstName = localStorage.getItem('firstName');
  lastName = localStorage.getItem('lastName');
  openNavBar = false;
  gridView = true;
  listView = false;
  
  constructor(
    private router: Router , private authService: AuthService
  ) {}

  ngOnInit() {
    var profile = localStorage.getItem("profileId");
    this.authService.get(this.baseUrl+"/api/transaction/getTransaction?action=" + "H" + "&days=" + "All" + "&profileId=" + profile).subscribe((res) => {
      if(res['data']){
        this.homeArr = res['data'];
      }
      }, (error) => {
      console.log(error);
      });

    this.gridView = true;
    // document.getElementById("mySidenav").style.width = "0";
  }
  
  async onSubmit(form) {
    this.router.navigate(["logout"]); 
  }

  logOut(){
    this.router.navigate(["logout"]); 
  }
  getSplit(fullName){
    if(fullName.includes(' ')){
      return fullName.split(' ').map(n => n[0]).join('');
    }
    else{
      return fullName[0];
    }
  }
  home(){
    this.openNavBar = false;
      // document.getElementById("mySidenav").style.width = "0";
      document.getElementById("column").style.opacity = "1";
  }
  transaction(){
    this.router.navigate(["transactions"]); 
  }
  sendMoney(name){
    this.router.navigate(["sendmoney"],{queryParams:{"receiverName":name}}); 
  }
  wallet(){
    this.router.navigate(["managewallet"]); 
  }
  settings(){
    this.router.navigate(["settings"]); 
  }

  listViewFunc(){
    this.gridView = false;
    this.listView = true;
    $("#list").attr('src',"assets/yellow-list.png");
    $("#grid").attr('src',"assets/black-grid.png");
  }

  gridViewFunc(){
    this.gridView = true;
    this.listView = false;
    $("#list").attr('src',"assets/black-list.png");
    $("#grid").attr('src',"assets/yellow-grid.png");
  }

  openNav() {
    if(!this.openNavBar){
      this.openNavBar = true;
      // document.getElementById("mySidenav").style.width = "225px";
      document.getElementById("column").style.opacity = "45%";
    }
    else{
      this.openNavBar = false;
      // document.getElementById("mySidenav").style.width = "0";
      document.getElementById("column").style.opacity = "1";
    }
  }
  
  // getUrl(i){

  // }
}
