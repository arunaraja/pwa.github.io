import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './../../../services/api/api.service'
import { environment } from "./../../../../environments/environment";
import { $ } from 'jquery'
declare var $: any;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: []
})
export class transactionPage implements OnInit {
  submitted = false;
  openNavBar = false;
  homeArr =[];
  baseUrl = environment.baseUrl;
  constructor(
    private router: Router, private authService: AuthService
  ) { }

  ngOnInit() {
    this.click7days();
  }

  logOut() {
    this.router.navigate(["logout"]);
  }
  transaction() {
    this.openNavBar = false;
    document.getElementById("column").style.opacity = "1";
  }
  home() {
    this.router.navigate(["home"]);
  }
  sendMoney() {
    this.router.navigate(["sendmoney"]);
  }
  wallet() {
    this.router.navigate(["managewallet"]);
  }
  settings() {
    this.router.navigate(["settings"]);
  }
  openNav() {
    if (!this.openNavBar) {
      this.openNavBar = true;
      document.getElementById("column").style.opacity = "45%";
    }
    else {
      this.openNavBar = false;
      document.getElementById("column").style.opacity = "1";
    }
  }
  async onSubmit(form) {
    this.submitted = true;
    if (form.form.invalid) {
      return;
    }
    else {
      console.log("Next Navigation")
      this.router.navigate(["register"]);
    }
  }
  
  click7days() {
    $("#7day").css("background-color", "#ffc33f");
    $("#30day").css("background-color", "#fff");
    var profile = localStorage.getItem("profileId");
    this.authService.get(this.baseUrl+"/api/transaction/getTransaction?action=" + "T" + "&days=" + "7" + "&profileId=" + profile).subscribe((res) => {
      if(res['data']){
        this.homeArr = res['data'];
      }
      }, (error) => {
      console.log(error);
      });
  }

  click30days() {
    $("#7day").css("background-color", "#fff");
    $("#30day").css("background-color", "#ffc33f");
    var profile = localStorage.getItem("profileId");
    this.authService.get(this.baseUrl+"/api/transaction/getTransaction?action=" + "T" + "&days=" + "30" + "&profileId=" + profile).subscribe((res) => {
      if(res['data']){
        this.homeArr = res['data'];
      }
      }, (error) => {
      console.log(error);
      });
  }
}
