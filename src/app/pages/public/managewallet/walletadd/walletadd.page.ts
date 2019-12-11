import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-walletadd',
  templateUrl: './walletadd.page.html'
  
})
export class walletaddPage implements OnInit {
  sendMsg ={};
  constructor(private router: Router) { }

  ngOnInit() {
  }

  wallet(){
    this.router.navigate(['managewallet']);
  }
 
}
