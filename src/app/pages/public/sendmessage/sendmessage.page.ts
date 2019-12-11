import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sendmessage',
  templateUrl: './sendmessage.page.html'
})
export class sendmessagePage implements OnInit {
  sendMsg ={};
  constructor(private router: Router) { }

  ngOnInit() {
    this.sendMsg['textVal'] = "Hi Eric I had transferred $3100 ."
  }

  sendmoney() {
    this.router.navigate(["sendmoney"]);
  }
  getHistory() {
    this.router.navigate(["transactions"]);
  }
}
