import { Routes } from "@angular/router";
import { managewalletPage } from './managewallet.page';
import { walletaddPage } from './walletadd/walletadd.page';


export const walletRouter: Routes = [
  {
    path: '',
    component: managewalletPage,
  },
  {
    path: 'walletadd',
    component:walletaddPage
  }
]