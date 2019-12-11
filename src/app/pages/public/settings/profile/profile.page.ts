import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html'
  
})
export class profilePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
 
  settings(){
    this.router.navigate(["settings"]);
  }

 
}
