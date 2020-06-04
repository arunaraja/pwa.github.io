import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../../services/api/api.service'
import { environment } from "../../../../../environments/environment";
import * as _ from "lodash";
declare var $ : any;
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-receiversprofileEdit',
  templateUrl: './receiversProfileEdit.page.html'
  
})
export class receiversprofileeditPage implements OnInit {
  title = "Edit Receiver's Profile";
  submitted = false ;
  user : any ;
  sendMoney = {} ;
  id : any ;
  baseUrl = environment.baseUrl;
  profile = localStorage.getItem("profileId");
  countryJsonArr : any ;
  cityArr : any  ;
  countryArr =[] ;
  stateArr = [] ;
  constructor(private router: Router , public activatedRoute : ActivatedRoute , private authService: AuthService,private http: HttpClient) {
    this.id = activatedRoute.snapshot.queryParams["id"];
   }
 
  ngOnInit() {
    this.authService.get(this.baseUrl+"/api/user/getReceiversProfile?type="+"ID Based"+"&receiverProfileId="+this.id).subscribe((res) => {
      if(res['data']){
      this.sendMoney = res['data']
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
    this.router.navigate(["/settings/receiversProfile"]);
  }
  
  onSaveClick(form){
        this.submitted = true;
        if (form.form.invalid) {
          return;
        }
        else {
            this.authService.post(this.baseUrl + "/api/user/updateReceiversProfile", this.sendMoney).subscribe((res) => {
                if (res['data']) {
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
