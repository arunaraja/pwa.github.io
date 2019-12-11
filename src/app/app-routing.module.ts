import { NgModule } from '@angular/core';
import { PreloadAllModules,Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: './pages/public/welcome/welcome.module#welcomePageModule'
  },
  {
    path: 'register',
    loadChildren: './pages/public/register/register.module#registerPageModule'
  },
  {
    path: 'changepassword',
    loadChildren: './pages/public/changepassword/changepassword.module#changePasswordPageModule'
  },
  {
    path: 'changepasssuccess',
    loadChildren: './pages/public/changepasssuccess/changepasssuccess.module#changepasssuccessPageModule'
  },
  {
    path: 'forgotpassword',
    loadChildren: './pages/public/forgotpassword/forgotpassword.module#forgotpasswordPageModule'
  },
  {
    path: 'login',
    loadChildren: './pages/public/login/login.module#loginPageModule'
  },
  {
    path: 'logout',
    loadChildren: './pages/public/logout/logout.module#logoutPageModule'
  },
  {
    path: 'home',
    loadChildren: './pages/public/home/home.module#homePageModule'
  },
  {
    path: 'thankyou',
    loadChildren: './pages/public/thankyou/thankyou.module#thankyouPageModule'
  },
  {
    path: 'transactions',
    loadChildren: './pages/public/transactions/transactions.module#transactionPageModule'
  },
  {
    path: 'verify',
    loadChildren: './pages/public/verify/verify.module#verifyPageModule'
  },
  {
    path: 'sendmoney',
    loadChildren: './pages/public/sendmoney/sendmoney.module#sendmoneyPageModule'
  },
  {
    path: 'sendconfirmation',
    loadChildren: './pages/public/sendmoneyconfirmation/sendmoneyconfirmation.module#sendmoneyconfirmationPageModule'
  },
  {
    path: 'sendmessage',
    loadChildren: './pages/public/sendmessage/sendmessage.module#sendmessagePageModule'
  },
  {
    path: 'managewallet',
    loadChildren: './pages/public/managewallet/managewallet.module#managewalletPageModule'
  },
  {
    path: 'settings',
    loadChildren: './pages/public/settings/settings.module#settingsPageModule'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
