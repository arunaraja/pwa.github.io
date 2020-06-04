import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../../services/api/api.service'
import { environment } from "../../../../../environments/environment";
import * as _ from "lodash";
declare var $ : any;
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-receiversprofileAdd',
  templateUrl: './receiversProfileAdd.page.html'
  
})
export class receiversprofileaddPage implements OnInit {
  title = "Add Receiver's Profile" ;
  submitted = false ;
  user : any ;
  sendMoney = {} ;
  baseUrl = environment.baseUrl;
  profile = localStorage.getItem("profileId");
  countryJsonArr : any ;
  cityArr : any  ;
  from = ""  ;
  countryArr =[] ;
  stateArr = [] ;
  constructor(private router: Router  , public activatedRoute : ActivatedRoute, private authService: AuthService,private http: HttpClient) {
    this.sendMoney['receiverCountry'] = "";
    this.sendMoney['receiverState'] = "";
    this.sendMoney['receiverCity'] = "";
    this.from = activatedRoute.snapshot.queryParams["from"];
   }
 
  ngOnInit() {
    // this.authService.get(this.baseUrl+"/api/user/getProfile?profileId=" + this.profile).subscribe((res) => {
    //   if(res['data']){
    //   this.user = res['data']
    //   console.log("this.user")
    //   console.log(this.user)
    //   }
    //   }, (error) => {
    //   console.log(error);
    //   });
      this.http.get("assets/country.json").subscribe(data => {
        this.countryJsonArr = data;
        var countryArr = _.groupBy(this.countryJsonArr, 'country');
        var arr = _.map(countryArr, function (trans) {
          return { country: trans[0].country };
        });
        this.countryArr = arr;
    });

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
  }
  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  validateName(name) {
    const re = /^[a-zA-Z]+$/;
    return re.test(name);
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

  settings(){
    if(this.from === "sendMoney")
    this.router.navigate(["sendmoney"],{queryParams:{"newTransfer":'true'}});
    else
      this.router.navigate(["/settings/receiversProfile"]);
  }
  
  onSaveClick(form){
        this.submitted = true;
        if (form.form.invalid) {
          return;
        }
        else {
            this.authService.post(this.baseUrl + "/api/user/addReceiversProfile", this.sendMoney).subscribe((res) => {
                if (res['data']) {
                  if(this.from === "sendMoney")
                    this.router.navigate(["sendmoney"],{queryParams:{"newTransfer":'true'}});
                  else
                    this.router.navigate(["/settings/receiversProfile"]);
                }
                else {
                  return;
                }
              }, (error) => {
                console.log(error);
              });


        }
  }
 
}
