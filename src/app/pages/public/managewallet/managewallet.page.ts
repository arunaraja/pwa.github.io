import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managewallet',
  templateUrl: './managewallet.page.html'
})
export class managewalletPage implements OnInit {
  sendMsg ={};
  constructor(private router: Router) { }

  ngOnInit() {
  }
 
  addwallet(){
    this.router.navigate(['/managewallet/walletadd']) ;
  }
  home(){
    this.router.navigate(['home']) ;
  }
}
