import { Routes } from "@angular/router";
import { sendmoneyPage } from './sendmoney.page';
import { previewPage } from './preview/preview.page';


export const sendMoneyRouter: Routes = [
  {
    path: '',
    component: sendmoneyPage
  },
  {
    path: 'preview',
    component:previewPage
  }
]