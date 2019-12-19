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
  openNavBar = false;
  gridView = true;
  listView = false;
  
  constructor(
    private router: Router , private authService: AuthService
  ) {}

  ngOnInit() {
    // + "&receiverName=" + "Eric"
    this.authService.get(this.baseUrl+"/api/transaction/getTransaction?action=" + "H" + "&days=" + "All" + "&profileId=" + "1" ).subscribe((res) => {
      if(res['data']){
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
  home(){
    this.openNavBar = false;
      // document.getElementById("mySidenav").style.width = "0";
      document.getElementById("column").style.opacity = "1";
  }
  transaction(){
    this.router.navigate(["transactions"]); 
  }
  sendMoney(){
    this.router.navigate(["sendmoney"]); 
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
}
