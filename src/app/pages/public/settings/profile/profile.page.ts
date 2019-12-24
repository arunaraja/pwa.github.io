import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './../../../../services/api/api.service'
import { environment } from "./../../../../../environments/environment";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html'
  
})
export class profilePage implements OnInit {
  user : any ;
  baseUrl = environment.baseUrl;
  profile = localStorage.getItem("profileId");
  constructor(private router: Router , private authService: AuthService) { }

  ngOnInit() {
    this.authService.get(this.baseUrl+"/api/user/getProfile?profileId=" + this.profile).subscribe((res) => {
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

 
}
