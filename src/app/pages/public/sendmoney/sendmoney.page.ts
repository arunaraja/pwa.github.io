import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from "src/environments/environment";
import { AuthService } from 'src/app/services/api/api.service';
import {$} from 'jquery'
import { HttpClient } from '@angular/common/http';
import * as _ from "lodash";
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
  sendMon = true;
  preview = false;
  confirmation = false;
  hide = true;
  hideView = true;
  seeView = false;
  profile;
  transmissionInfo = true;
  receiverInfo = false;
  see = false;
  nextPage = false;
  vendorMasterArr = [] ;
  bankArr: any;
  bankArrData: any;
  countryJsonArr: any;
  cityArr: any;
  vendorTransactionLocArr = [] ;
  transactionArrSend = [] ;
  transactionArrReceive = [] ;
  countryArr = [] ;
  stateArr = [] ;
  vendorTransactionArr = [] ;
  name ="";
  phoneNumber ="";
  vendorCustomerId ="";
  firstPage = false;
  sendMoney = {paymentMethod:"Wire Transfer",transactionFee:"0.00"};
  constructor(
    private router: Router , public activatedRoute : ActivatedRoute ,private authService :AuthService,private http: HttpClient
  ) {
    this.sendMoney['vendorId'] = "";
    this.sendMoney['receiverCountry'] = "";
    this.sendMoney['receiverState'] = "";
    this.sendMoney['receiverCity'] = "";
    this.sendMoney['deliveryMethod'] = "";
    this.sendMoney['deliveryBankName'] = "";
    this.sendMoney['totalFee'] = "10.00";
    this.profile = localStorage.getItem("profileId");
    this.name = activatedRoute.snapshot.queryParams["receiverName"];
    this.vendorCustomerId = localStorage.getItem('vendorCustomerId');
    this.phoneNumber = localStorage.getItem('phoneNumber');
    console.log(this.vendorCustomerId)
    console.log(this.phoneNumber)
    this.sendMoney['profileId'] = this.profile;
    this.sendMoney['ourFee']  = "10.00"
    // this.sendMoney['paymentMethod'] = "Wire Transfer";
  }

  ngOnInit() {
    if(this.name){
      var  Data;
      var  deliveryMethod;
      var  paymentMethod;
      var  Data;
      this.authService.get(this.baseUrl+"/api/transaction/getTransaction?action=" + "L" + "&days=" + "1" + "&profileId=" + this.profile+ "&receiverName=" + this.name).subscribe((res) => {
        if(res['data']){
           Data = res['data'];
           this.sendMoney = Data;
           this.authService.get(this.baseUrl + "/api/vendor/getVendorMaster").subscribe((res) => {
            if (res['data']) {
              this.vendorMasterArr = res['data']
            }
          }, (error) => {
            console.log(error);
          });
           this.sendMoney['receiverCountry'] = Data.receiverCountry;
           this.authService.get(this.baseUrl+"/api/vendor/getVendorTransactionMethod?vendorId="+Data.vendorId).subscribe((res) => {
            if(res['data']){
            this.transactionArrSend = _.filter(res['data'],{typeCode:"SND"});
            this.transactionArrReceive =_.filter(res['data'],{typeCode:"RCV"});
            var obj2 =  _.filter(this.transactionArrReceive,function(dt){
              if(dt.vendorTransactionId.toString() === Data.deliveryMethodId.toString()){
                return dt;
              }
             }); 
             if(obj2.length > 0){
              deliveryMethod =  obj2[0].sendReceiveMethod ;
              this.sendMoney['deliveryMethod'] = deliveryMethod? deliveryMethod :"";
             }
            var obj3 =  _.filter(this.transactionArrSend,function(dt){
              if(dt.vendorTransactionId.toString() === Data.paymentMethodId.toString()){
                return dt;
              }
             }); 
             if(obj3.length > 0){
              paymentMethod =  obj3[0].vendorTransactionId ;
              this.sendMoney['paymentMethod'] = paymentMethod ? paymentMethod : "";
             }
            }
            }, (error) => {
            console.log(error);
            });
           
           this.http.get("assets/country.json").subscribe(data => {
            this.countryJsonArr = data;
            var countryArr = _.groupBy(this.countryJsonArr, 'country');
            var arr = _.map(countryArr, function (trans) {
              return { country: trans[0].country };
            });
            this.countryArr = arr;
            
            var obj =  _.filter(this.countryJsonArr,{country:this.sendMoney['receiverCountry']}); 
            if(obj.length > 0){
              var stateArr = _.groupBy(obj, 'state');
              var arr1 = _.map(stateArr, function (trans) {
                return { state: trans[0].state };
              });
              this.stateArr = arr1;
            }
            var obj =  _.filter(this.countryJsonArr,{state:this.sendMoney['receiverState']}); 
            if(obj.length > 0){
              this.cityArr = obj;
            }
            else{
              this.cityArr = [];
            }
            var vendorAgentId;
            if(this.sendMoney['deliveryMethod'] === 'Cash Pickup'){
              this.authService.get(this.baseUrl+"/api/vendor/getVendorTransactionLocation?vendorId="+this.sendMoney['vendorId']).subscribe((res) => {
                if(res['data']){
                this.vendorTransactionLocArr = res['data'];

                if(this.vendorTransactionLocArr.length> 0){
                  var obj = _.filter(this.vendorTransactionLocArr,{vendorAgentId:Data.vendorAgentId});
                  if(obj.length > 0){
                    vendorAgentId = obj[0].vendorAgentId;
                    this.sendMoney['vendorAgentId'] = vendorAgentId ? vendorAgentId : "";
                  }
                }
                }
                }, (error) => {
                console.log(error);
                });
            }
            
            
            this.sendMoney['receiverState'] = Data.receiverState ? Data.receiverState :"";
            this.sendMoney['receiverCity'] = Data.receiverCity ? Data.receiverCity: "";
          });
          var bank;
          this.http.get("assets/bank.json").subscribe(data => {
            this.bankArr = _.filter(data,{country:this.sendMoney['receiverCountry']});
            if(this.sendMoney['deliveryMethod'] === 'Bank Account'){
              var obj = _.find( this.bankArr,{Bank:Data.deliveryBankName});
              if(obj){
                bank = obj.Bank;
                this.sendMoney['deliveryBankName'] = bank ?bank: "";
              }
            }
            }, (error) => {
            console.log(error);
            });
            
            if(this.sendMoney['receiverCountry'] === "USA"){
              console.log("HIT USA")
              $('#receiverImg').attr('src', 'assets/united-states-1.png');
            }
            if(this.sendMoney['receiverCountry'] === "Mexico"){
              console.log("HIT MEXICO")
              $('#receiverImg').attr('src', 'assets/mexico.png');
            }
        }
        }, (error) => {
        console.log(error);
        });
       
    }
    else{
      this.http.get("assets/country.json").subscribe(data => {
        this.countryJsonArr = data;
        var countryArr = _.groupBy(this.countryJsonArr, 'country');
        var arr = _.map(countryArr, function (trans) {
          return { country: trans[0].country };
        });
        this.countryArr = arr;
        this.authService.get(this.baseUrl + "/api/vendor/getVendorMaster").subscribe((res) => {
          if (res['data']) {
            this.vendorMasterArr = res['data']
          }
        }, (error) => {
          console.log(error);
        });
      });
    }
    
  }

  onChangePayMethod(method){
   var obj =  _.filter(this.transactionArrSend,function(dt){
     if(dt.vendorTransactionId.toString() === method.toString()){
       return dt;
     }
    });
    if(obj.length > 0){
      this.sendMoney['transactionFee'] = obj[0].transferFee ;
      this.sendMoney['totalFee'] = parseFloat(obj[0].transferFee) +  parseFloat(this.sendMoney['ourFee']);
    }
  }


  setPhoneNumberCode(country){
    var obj =  _.filter(this.countryJsonArr,{country:country}); 
    if(obj.length > 0){
      this.sendMoney["receiverPhoneNumber"] =  obj[0].countrycode ;
    
      var stateArr = _.groupBy(obj, 'state');
      var arr = _.map(stateArr, function (trans) {
        return { state: trans[0].state };
      });
      this.stateArr = arr;
    }
    else{
      this.sendMoney["receiverPhoneNumber"]  = "+";
      this.stateArr = [] ;
    }
    this.http.get("assets/bank.json").subscribe(data => {
      this.bankArr = _.filter(data,{country:this.sendMoney['receiverCountry']});
      }, (error) => {
      console.log(error);
      });
      if(country === "USA"){
        $('#receiverImg').attr('src', 'assets/united-states-1.png');
      }
      if(country === "Mexico"){
        $('#receiverImg').attr('src', 'assets/mexico.png');
      }
  }

  onChangeState(state){
    var obj =  _.filter(this.countryJsonArr,{state:state}); 
    if(obj.length > 0){
       this.cityArr = obj;
    }
    else{
      this.cityArr = [];
    }
  }

  callTransactionMethodsAPI(data) {    
    this.authService.get(this.baseUrl+"/api/vendor/getVendorTransactionMethod?vendorId="+data).subscribe((res) => {
      if(res['data']){
      this.transactionArrSend = _.filter(res['data'],{typeCode:"SND"});
      this.transactionArrReceive =_.filter(res['data'],{typeCode:"RCV"});
      }
      }, (error) => {
      console.log(error);
      });
  }
  
  callTransactionLocationAPI(data) {
    if(data === 'Cash Pickup'){
      this.authService.get(this.baseUrl+"/api/vendor/getVendorTransactionLocation?vendorId="+this.sendMoney['vendorId']).subscribe((res) => {
        if(res['data']){
        this.vendorTransactionLocArr = res['data']
        }
        }, (error) => {
        console.log(error);
        });
    }
    if(data === 'Bank Account'){
      
    }
   
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

  getVendorName(id){
     var obj =  _.filter(this.vendorMasterArr,function(dt){
      if(dt.vendorId.toString() === id.toString()){
        return dt;
      }
     }); 
     if(obj.length > 0){
       return obj[0].vendorName ;
     }
     else{
       return id;
     }
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
  onClickMsg(){
    this.router.navigate(["sendmessage"],{queryParams:{"receiverName":this.name ? this.name : this.sendMoney['receiverName'],"phone":this.sendMoney['receiverPhoneNumber']}});
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

  onChangeSend(amt1){
    var amt = parseFloat(amt1);
    if(this.sendMoney['receiverCountry'] === 'Mexico'){
      var val = 19.2736;
    }
    else if(this.sendMoney['receiverCountry'] === 'USA'){
       val = 1;
    }
    else{
      val = 0 ;
    }
    
    var toFixed4 = (amt * val).toFixed(4);
    this.sendMoney["totalAmountSentToReceiver"] = toFixed4;
  }
  onPreviewClick(form){
    this.submitted = true;
    if (form.form.invalid) {
      return;
    }
    else {
      this.sendMon = false;
      this.preview = true;
      this.confirmation = false;
      this.sendMoney["transactionTotalAmount"] = parseFloat(this.sendMoney["transactionAmount"]) + parseFloat(this.sendMoney["totalFee"]);
    }
  }
  
  onClickedit(){
    this.sendMon = true;
    this.preview = false;
    this.confirmation = false;
  }
  getPayemntMethod(id){
  var obj =  _.filter(this.transactionArrSend,function(dt){
    if(dt.vendorTransactionId.toString() === id.toString()){
      return dt;
    }
   }); 
   if(obj.length > 0){
     return obj[0].sendReceiveMethod ;
   }
   else{
     return id;
   }
}
  getDelievryMethod(id){
  var obj =  _.filter(this.transactionArrReceive,function(dt){
    if(dt.sendReceiveMethod.toString() === id.toString()){
      return dt;
    }
   }); 
   if(obj.length > 0){
     return obj[0].vendorTransactionId ;
   }
   else{
     return id;
   }
}
  onSendClick(){  
    if(this.sendMoney["receiverName"]){
      this.sendMoney["deliveryBankAccountName"] = this.sendMoney["receiverName"] ;
    }
    var val = this.sendMoney["receiverName"] ? this.sendMoney["receiverName"] : this.name ;
    if(val){
      this.sendMoney["receiverName"] = val ;
    }
    var val1 = this.sendMoney['paymentMethod'] ;
    this.sendMoney['paymentMethod'] = this.getPayemntMethod(val1);
    this.sendMoney['paymentMethodId'] =  val1;
    this.sendMoney['deliveryMethodId'] = this.getDelievryMethod(this.sendMoney['deliveryMethod']);
    this.sendMoney['deliveryMethod'] =  this.sendMoney['deliveryMethod'];
    this.sendMoney['vendorName'] =  this.getVendorName(this.sendMoney['vendorId']);
    var id = this.sendMoney['vendorId'];
    if(this.sendMoney['deliveryMethod'] === 'Cash Pickup'){
      var arrayObj = _.filter(this.vendorTransactionLocArr, function (dt) {
        if (dt.vendorAgentId.toString() === id.toString()) {
          return dt ;
        }
      });
      if(arrayObj.length > 0){
        this.sendMoney['cashPickUpAddress1'] = arrayObj[0].address1;
        this.sendMoney['cashPickUpAddress2'] = arrayObj[0].address2;
        this.sendMoney['cashPickUpCity'] = arrayObj[0].city;
        this.sendMoney['cashPickUpState'] = arrayObj[0].state;
        this.sendMoney['cashPickUpZipcode'] = arrayObj[0].zip;
      }
    }
    console.log("this.sendMoney['vendorId']")
    console.log(this.sendMoney['vendorId'])
    
    if(this.sendMoney['vendorId']){
      var arrayObj = _.filter(this.vendorMasterArr,function(dt){
        if(dt.vendorId.toString() === id.toString()){
        return dt;
        }
      });
      console.log("arrayObj")
      console.log(arrayObj)
      if(arrayObj.length > 0){
        this.sendMoney['vendorCode'] = arrayObj[0].vendorCode;
      }
    }
    this.sendMoney['vendorCustomerId'] = this.vendorCustomerId;
    this.sendMoney['phoneNumber'] = this.phoneNumber;
    if(this.sendMoney['receiverCountry'] === 'Mexico'){
      var val2 = 19.27;
    }
    else if(this.sendMoney['receiverCountry'] === 'USA'){
       val2 = 1;
    }
    this.sendMoney['exchangeRate'] = val2;
    
    if(this.sendMoney['transactionId']){
      delete this.sendMoney['transactionId'];
    }
    if(this.sendMoney['updatedBy']){
      delete this.sendMoney['updatedBy'];
    }
    if(this.sendMoney['createdBy']){
      delete this.sendMoney['createdBy'];
    }
    if(this.sendMoney['updatedDateTime']){
      delete this.sendMoney['updatedDateTime'];
    }
    if(this.sendMoney['createdDateTime']){
      delete this.sendMoney['createdDateTime'];
    }
    console.log("this.sendMoney")
    console.log(this.sendMoney)
    this.authService.post(this.baseUrl + "/api/transaction/createTransaction", this.sendMoney).subscribe((res) => {
      if (res['data']) {
        this.sendMon = false;
        this.preview = false;
        this.confirmation = true;
        // this.router.navigate(["sendconfirmation"]);
      }
      else {
        return;
      }
    }, (error) => {
      console.log(error);
    });
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
  openNav() {
    if(!this.openNavBar){
      this.openNavBar = true;
      document.getElementById("column").style.opacity = "45%";
    }
    else{
      this.openNavBar = false;
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
  sendMoneyClick(){
    this.router.navigate(['/managewallet/walletadd'],{skipLocationChange:true}).then(() => {
      this.router.navigate(['sendmoney']);
    });
  }
  settings(){
    this.router.navigate(["settings"]); 
  }
  wallet(){
    this.router.navigate(["managewallet"]); 
  }
  onClickSendAgain(){
    this.sendMon = true;
    this.preview = false;
    this.confirmation = false;
    this.router.navigate(['/managewallet/walletadd'],{skipLocationChange:true}).then(() => {
      this.router.navigate(['sendmoney']);
    });
  }

  // onClickMsg(){
  //   this.router.navigate(["sendmessage"]); 
  // }
}
