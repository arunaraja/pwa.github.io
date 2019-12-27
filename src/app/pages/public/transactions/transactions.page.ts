import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './../../../services/api/api.service'
import { environment } from "./../../../../environments/environment";
import { $ } from 'jquery'
import * as _ from "lodash";
declare var $: any;

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: []
})
export class transactionPage implements OnInit {
  submitted = false;
  openNavBar = false;
  list = true;
  confirmation = false;
  homeArr = [];
  sendMoneyObj = {};
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
        // this.homeArr = res['data'];
        this.homeArr = res['data']
      }
      }, (error) => {
      console.log(error);
      });
  }

  getDate(date1){
    var val = new Date(date1);
    var d = val.getDate() ;
    var m = val.getMonth() ;
    return d+""+this.getOrdinal(d)+" "+this.getMonthVal(m)+" "+val.getFullYear();
    
  }
  getOrdinal(d){
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
  }
  }
  getMonthVal(m){
    var arr = [{ind : 0,month:"Jan"},{ind:1,month:"Feb"},{ind:2,month:"Mar"},{ind:3,month:"Apr"},,{ind:4,month:"May"},{ind:5,month:"Jun"},
    {ind:6,month:"Jul"},{ind:7,month:"Aug"},{ind:8,month:"Sep"},{ind:9,month:"Oct"},{ind:10,month:"Nov"},{ind:11,month:"Dec"}];
    var obj = _.find(arr,{ind:m});
    return obj ? obj.month : "";
  }
  

  transactions(){
    this.router.navigate(['/managewallet/walletadd'],{skipLocationChange:true}).then(() => {
      this.router.navigate(['transactions']);
    });
  }

  viewDetails(obj){
    this.sendMoneyObj = obj;
    this.list = false;
    this.confirmation = true;
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

  getSplit(fullName){
    if(fullName){
      if(fullName.includes(' ')){
        return fullName.split(' ').map(n => n[0]).join('');
      }
      else{
        return fullName[0];
      }
    }
    
  }
}
