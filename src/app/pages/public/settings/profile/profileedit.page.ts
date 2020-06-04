import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './../../../../services/api/api.service'
import { environment } from "./../../../../../environments/environment";

@Component({
  selector: 'app-profile',
  templateUrl: './profileedit.page.html'
  
})
export class profileeditPage implements OnInit {
  title = "Edit Profile";
  submitted = false ;
  user : any ;
  baseUrl = environment.baseUrl;
  profile = localStorage.getItem("profileId");
  constructor(private router: Router , private authService: AuthService) { }

  ngOnInit() {
    this.authService.get(this.baseUrl+"/api/user/getProfile?profileId=" + this.profile).subscribe((res) => {
      if(res['data']){
      this.user = res['data']
      console.log("this.user")
      console.log(this.user)
      }
      }, (error) => {
      console.log(error);
      });
  }
  validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  validateName(name) {
    const re = /^[a-zA-Z]+$/;
    return re.test(name);
  }
  settings(){
    this.router.navigate(["settings"]);
  }
  
  onUpdateClick(form){
        this.submitted = true;
        if (form.form.invalid) {
          return;
        }
        else {
            this.authService.post(this.baseUrl + "/api/user/updateProfile", this.user).subscribe((res) => {
                if (res['data']) {
                  this.router.navigate(["/settings/profile"]);
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
