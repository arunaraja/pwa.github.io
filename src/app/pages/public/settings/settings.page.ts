import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: []
})
export class settingsPage implements OnInit {
  title = "Settings";
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
  }

  home(){
    this.router.navigate(["home"]); 
  }

  profile(){
    this.router.navigate(["/settings/profile"]);
  }

  profileReceiver(){
    this.router.navigate(["/settings/receiversProfile"]);
  }
}
