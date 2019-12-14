import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {$} from 'jquery'
declare var $ : any;

@Component({
  selector: 'app-preview',
  templateUrl: './preview.page.html',
  styleUrls: []
})
export class previewPage implements OnInit {
  
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
  }
  
  home(){
    this.router.navigate(["home"]);
  }
  onSendClick(){
    this.router.navigate(["sendconfirmation"]);
  }
}
