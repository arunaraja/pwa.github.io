import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from "src/environments/environment";
import { AuthService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-sendmessage',
  templateUrl: './sendmessage.page.html'
})
export class sendmessagePage implements OnInit {
  msg ={};
  name ="";
  phone ="";
  profile ="";
  submitted = false;
  sent = false;
  baseUrl = environment.baseUrl;
  constructor(private router: Router, public activatedRoute : ActivatedRoute,private authService :AuthService) { 
    this.name = activatedRoute.snapshot.queryParams["receiverName"];
    this.phone = activatedRoute.snapshot.queryParams["phone"];
    this.profile = localStorage.getItem('profileId');
  }

  ngOnInit() {
  }

  onClickSend(form) {
    this.submitted = true;
    if (form.form.invalid) {
      return;
    }
    else{
      this.authService.post(this.baseUrl + "/api/utility/createSMS", {profileId:this.profile,receiverName:this.name,receiverPhoneNumber:this.phone,message:this.msg['message']}).subscribe((res) => {
        if (res['data']) {
          this.sent = true;
        }
        else {
          return;
        }
      }, (error) => {
        console.log(error);
      });
    }
    
  }
  msgGo() {
    this.router.navigate(["home"]);
  }
  getHistory() {
    this.router.navigate(["transactions"]);
  }
}
