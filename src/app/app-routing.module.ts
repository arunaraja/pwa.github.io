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
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
