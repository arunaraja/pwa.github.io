import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { environment } from "src/environments/environment";
import { AuthService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-sendmessage',
  templateUrl: './sendmessage.page.html'
})
export class sendmessagePage implements OnInit {
  title = "Send Message";
  msg ={};
  name ="";
  phone ="";
  profile ="";
  fromPage ="";
  submitted = false;
  sent = false;
  id : any;
  baseUrl = environment.baseUrl;
  constructor(private router: Router, public activatedRoute : ActivatedRoute,private authService :AuthService) { 
    this.name = activatedRoute.snapshot.queryParams["receiverName"];
    this.phone = activatedRoute.snapshot.queryParams["phone"];
    this.fromPage = activatedRoute.snapshot.queryParams["fromPage"];
    this.id = activatedRoute.snapshot.queryParams["id"];
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
      this.authService.post(this.baseUrl + "/api/utility/createSMS", {receiverProfileId:this.id ? this.id : null,profileId:this.profile,receiverName:this.name,receiverPhoneNumber:this.phone,message:this.msg['message']}).subscribe((res) => {
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
    if(this.fromPage === 'profile')
      this.router.navigate(["/settings/receiversProfile"]);
    else
     this.router.navigate(["home"]);
  }
  
  getHistory() {
    this.router.navigate(["transactions"]);
  }
}
