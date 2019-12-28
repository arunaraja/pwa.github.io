import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from "src/environments/environment";
import { AuthService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-walletadd',
  templateUrl: './walletadd.page.html'
})
export class walletaddPage implements OnInit {
  sendMoney = {};
  profile;
  submitted = false;
  constructor(private router: Router, private authService: AuthService) { }
  baseUrl = environment.baseUrl;
  ngOnInit() {
    this.profile = localStorage.getItem("profileId");
  }

  wallet(form) {
    this.submitted = true;
    if (form.form.invalid) {
      return;
    }
    else {

      var splitDt = this.sendMoney['expiry'];
      var arr = splitDt.split("/");
      var obj = {
        nameOnCard: this.sendMoney['cardname'],
        cardNumber: this.sendMoney['ccdc'],
        cardExpiryMonth: arr[0],
        cardExpiryYear: arr[1],
        cardCvv: this.sendMoney['cvv'],
        walletType: "card",
        isPrimary: "Yes",
        profileId: this.profile,
        action: "Add"
      }
      this.authService.post(this.baseUrl + "/api/wallet/manageWallet", obj).subscribe((res) => {
        if (res['data']) {
          console.log(res)
          this.router.navigate(["managewallet"]);
          
        }
        else {
          return;
        }
      }, (error) => {
        console.log(error);
      });
    }
  }

  walletBack() {
    this.router.navigate(["managewallet"]);
  }
}
