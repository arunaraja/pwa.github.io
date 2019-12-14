import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {$} from 'jquery'
declare var $ : any;

@Component({
  selector: 'app-sendmoney',
  templateUrl: './sendmoney.page.html',
  styleUrls: []
})
export class sendmoneyPage implements OnInit {
  submitted = false ;
  openNavBar = false;
  hide = true;
  hideView = true;
  seeView = false;
  transmissionInfo = true;
  receiverInfo = false;
  see = false;
  nextPage = false;
  firstPage = false;
  sendMoney = {};
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.sendMoney['country'] = ""; 
    this.sendMoney['paymentMethod'] = "";
    this.sendMoney['vendor'] = "";
    this.sendMoney['deliveryMethod'] = "";
    this.sendMoney['state'] = "";
    this.sendMoney['city'] = "";
    this.sendMoney['location'] = "";
    this.sendMoney['bank'] = "";
  }
  
  home(){
    this.router.navigate(["home"]);
  }
  transmission(){ 
    if(!this.firstPage){
      this.firstPage = true;
    }
      else{
        this.firstPage = false;
      }
  }
  seeEye(){
    this.see = false;
    this.hide = true;
    this.hideView = true;
    this.seeView = false;
  }
  hideEye(){
    this.hide = true;
    this.see = true;
    this.hideView = false;
    this.seeView = true;
  }
  nextPageClick(){
   this.nextPage = true;
  //  if(this.sendMoney['deliveryMethod'] === 'bankaccount'){
  //   $("#viewpg").height('28pc');
  //  }
  //  if(this.sendMoney['deliveryMethod'] === 'cashPick'){
  //   $("#viewpg").height('25pc');
  //  }
   $("#viewpg").height('28pc');
   this.firstPage = false;
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

  onClickSend(){
    this.router.navigate(["sendconfirmation"]);
  }
  getHistory(){
    this.router.navigate(["transactions"]);
  }
  sendMessage(){
    this.router.navigate(["sendmessage"]);
  }
  onPreviewClick(){
    this.router.navigate(['/sendmoney/preview']) ;
  }
  receiver(){
    if(!this.receiverInfo){
      this.transmissionInfo = false;
      this.receiverInfo = true;
    }
    else{
      this.transmissionInfo = true;
      this.receiverInfo = false;
    }
    
  }
}
