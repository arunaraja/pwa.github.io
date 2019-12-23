import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './../../../services/api/api.service'
import { environment } from "./../../../../environments/environment";
import * as _ from "lodash";
import {$} from 'jquery'
declare var $ : any;

@Component({
  selector: 'app-managewallet',
  templateUrl: './managewallet.page.html'
})
export class managewalletPage implements OnInit {
  sendMsg ={};
  bankArr= [];
  cardArr= [];
  baseUrl = environment.baseUrl;

  constructor(private router: Router , private authService : AuthService) { }

  ngOnInit() {
    var profile = localStorage.getItem("profileId");
    console.log("profile",profile)
    this.authService.get(this.baseUrl+"/api/wallet/getWallet?profileId=" + profile ).subscribe((res) => {
      if(res['data']){
        this.bankArr = _.filter(res['data'],{walletType:"bank"});
        this.cardArr = _.filter(res['data'],{walletType:"card"});
      }
      }, (error) => {
      console.log(error);
      });
  }
 
  addwallet(){
    this.router.navigate(['/managewallet/walletadd']) ;
  }
  home(){
    this.router.navigate(['home']) ;
  }

  click1(action,id){
    var profile = localStorage.getItem("profileId");
    var obj = {
      updatedBy: "EM APP WALLET Update",
      updatedOn: new Date(),
      action: action,
      walletId : id,
      profileId: profile
    }
    this.authService.post(this.baseUrl + "/api/wallet/manageWallet", obj).subscribe((res) => {
      if (res) {
        console.log(res)
        this.router.navigate(['/managewallet/walletadd'],{skipLocationChange:true}).then(() => {
          this.router.navigate(['managewallet']);
        });
        // this.router.navigate(["managewallet"]);
      }
      else {
        return;
      }
    }, (error) => {
      console.log(error);
    });
    $('#click1').attr('src', 'assets/radio_on.png');
    $('#click2').attr('src', 'assets/radio_off.png');
    $('#click3').attr('src', 'assets/radio_off.png');
  }
 
  getNumberView(num){
    var NumberValue = num.replace(/^.{12}/g, 'XXXX XXXX XXXX ');
    return NumberValue;
  }

  manageWallet(action,id){
    var profile = localStorage.getItem("profileId");
    var obj = {
      updatedBy: "EM APP WALLET Delete",
      updatedOn: new Date(),
      action: action,
      walletId : id,
      profileId: profile
    }
    this.authService.post(this.baseUrl + "/api/wallet/manageWallet", obj).subscribe((res) => {
      if (res) {
        console.log(res)
        // this.router.navigate(["managewallet"]);
        this.router.navigate(['/managewallet/walletadd'],{skipLocationChange:true}).then(() => {
          this.router.navigate(['managewallet']);
        });
        
      }
      else {
        return;
      }
    }, (error) => {
      console.log(error);
    });
  }
 
}
