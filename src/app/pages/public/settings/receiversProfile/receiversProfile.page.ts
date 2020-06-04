import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../../../services/api/api.service'
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-receiversprofile',
  templateUrl: './receiversProfile.page.html'
  
})
export class receiversProfilePage implements OnInit {
  user : any ;
  title = "Receiver's Profile"
  baseUrl = environment.baseUrl;
  profile = localStorage.getItem("profileId");
  constructor(private router: Router , private authService: AuthService) { }

  ngOnInit() {
    this.authService.get(this.baseUrl+"/api/user/getReceiversProfile?type="+"All").subscribe((res) => {
      if(res['data']){
      this.user = res['data']
      }
      }, (error) => {
      console.log(error);
      });
  }
 
  settings(){
    this.router.navigate(["settings"]);
  }
  onclickMessage(name,phonenumber,id){
    this.router.navigate(["sendmessage"],{queryParams:{"receiverName":name,"phone":phonenumber,"fromPage":"profile","id":id}});
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

  onclick(id){
    this.router.navigate(["/settings/receiversEditProfile"],{queryParams:{"id":id}}); 
  }
  
  onClickedit(){
    this.router.navigate(["/settings/receiversAddProfile"]);
  }

 
}
