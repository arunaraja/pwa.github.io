import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {$} from 'jquery'
declare var $ : any;

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

  click1(){
    $('#click1').css('background-image', 'url(assets/radio_on.png)');
    $('#click2').css('background-image', 'url(assets/radio_off.png)');
    $('#click3').css('background-image', 'url(assets/radio_off.png)');
  }
  click2(){
    $('#click1').css('background-image', 'url(assets/radio_off.png)');
    $('#click2').css('background-image', 'url(assets/radio_on.png)');
    $('#click3').css('background-image', 'url(assets/radio_off.png)');
  }
  click3(){
    $('#click1').css('background-image', 'url(assets/radio_off.png)');
    $('#click2').css('background-image', 'url(assets/radio_off.png)');
    $('#click3').css('background-image', 'url(assets/radio_on.png)');
  }
}
