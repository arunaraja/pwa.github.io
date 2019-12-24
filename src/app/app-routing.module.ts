import { NgModule } from '@angular/core';
import { PreloadAllModules,Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    // redirectTo: 'login',
    loadChildren:  () => import('./pages/public/login/login.module').then(mod=>mod.loginPageModule)
    // pathMatch: 'full'
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/public/welcome/welcome.module').then(mod => mod.welcomePageModule)
  },
  {
    path: 'register',
    loadChildren:  () => import('./pages/public/register/register.module').then(mod=>mod.registerPageModule)
  },
  {
    path: 'changepassword',
    loadChildren:  () => import('./pages/public/changepassword/changepassword.module').then(mod=>mod.changePasswordPageModule)
  },
  {
    path: 'changepasssuccess',
    loadChildren:  () => import('./pages/public/changepasssuccess/changepasssuccess.module').then(mod=>mod.changepasssuccessPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren:  () => import('./pages/public/forgotpassword/forgotpassword.module').then(mod=>mod.forgotpasswordPageModule)
  },
  {
    path: 'login',
    loadChildren:  () => import('./pages/public/login/login.module').then(mod=>mod.loginPageModule)
  },
  {
    path: 'logout',
    loadChildren:  () => import('./pages/public/logout/logout.module').then(mod=>mod.logoutPageModule)
  },
  {
    path: 'home',
    loadChildren:  () => import('./pages/public/home/home.module').then(mod=>mod.homePageModule)
  },
  {
    path: 'thankyou',
    loadChildren:  () => import('./pages/public/thankyou/thankyou.module').then(mod=>mod.thankyouPageModule)
  },
  {
    path: 'transactions',
    loadChildren:  () => import('./pages/public/transactions/transactions.module').then(mod=>mod.transactionPageModule)
  },
  {
    path: 'verify',
    loadChildren:  () => import('./pages/public/verify/verify.module').then(mod=>mod.verifyPageModule)
  },
  {
    path: 'sendmoney',
    loadChildren:  () => import('./pages/public/sendmoney/sendmoney.module').then(mod=>mod.sendmoneyPageModule)
  },
  {
    path: 'sendconfirmation',
    loadChildren:  () => import('./pages/public/sendmoneyconfirmation/sendmoneyconfirmation.module').then(mod=>mod.sendmoneyconfirmationPageModule)
  },
  {
    path: 'sendmessage',
    loadChildren:  () => import('./pages/public/sendmessage/sendmessage.module').then(mod=>mod.sendmessagePageModule)
  },
  {
    path: 'managewallet',
    loadChildren:  () => import('./pages/public/managewallet/managewallet.module').then(mod=>mod.managewalletPageModule)
  },
  {
    path: 'settings',
    loadChildren:  () => import('./pages/public/settings/settings.module').then(mod=>mod.settingsPageModule)
  },
  // {
  //   path: 'otp',
  //   loadChildren: './pages/public/otp/otp.module#otpPageModule'
  // }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
