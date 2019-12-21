import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from "src/environments/environment";
import { AuthService } from 'src/app/services/api/api.service';
import {$} from 'jquery'
declare var $ : any;

@Component({
  selector: 'app-sendmoney',
  templateUrl: './sendmoney.page.html',
  styleUrls: []
})
export class sendmoneyPage implements OnInit {
  submitted = false ;
  baseUrl = environment.baseUrl;
  openNavBar = false;
  hide = true;
  hideView = true;
  seeView = false;
  profile;
  transmissionInfo = true;
  receiverInfo = false;
  see = false;
  nextPage = false;
  name ="";
  firstPage = false;
  sendMoney = {};
  constructor(
    private router: Router , public activatedRoute : ActivatedRoute ,private authService :AuthService
  ) {
    this.profile = localStorage.getItem("profileId");
    this.name = activatedRoute.snapshot.queryParams["receiverName"];
  }

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
  onPreviewClick(form){
    this.submitted = true;
    if (form.form.invalid) {
      return;
    }
    else {
      var obj= {};
      obj['profileId'] = this.sendMoney['profile'];
      obj['vendorId'] = this.sendMoney['vendor'];
      // obj['paymentMethodId'] = 
      // obj['deliveryMethodId'] = 
      // obj['vendorAgentId'] = 
      // obj['walletId'] = 
      // obj['receiverName'] = this.name;
      // obj['receiverCountry'] = 
      // obj['receiverPhoneNumber'] = 
      // obj['transactionAmount'] = 
      // obj['phoneNumber'] = 
      // obj['paymentMethod'] = 
      // obj['deliveryMethod'] = 
      // obj['deliveryBankName'] = 
      // obj['deliveryBankRoutingNumber'] = 
      // obj['deliveryBankAccountNumber'] = 
      // obj['cashPickUpAddress1'] = 
      // obj['cashPickUpAddress2'] = 
      // obj['cashPickUpCity'] = 
      // obj['cashPickUpState'] = 
      // obj['cashPickUpZipcode'] = 
      // obj['transactionFee'] = 
      // obj['ourFee'] = 
      // obj['totalFee'] = 
      // obj['exchangeRate'] = 
      // obj['transactionTotalAmount'] = 
      // obj['totalAmountSentToReceiver'] = 
      // obj['transactionStatus'] = 
      obj['createdDateTime'] = new Date();
      obj['createdBy'] = "EM APP WALLET ADD";
      this.authService.post(this.baseUrl + "/api/transaction/createTransaction", this.sendMoney).subscribe((res) => {
        if (res['data']) {
          console.log(res['data'])
          this.router.navigate(["managewallet"]);
        }
        else {
          return;
        }
      }, (error) => {
        console.log(error);
      });
    }
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
