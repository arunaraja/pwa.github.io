import { Routes } from "@angular/router";
import { settingsPage } from './settings.page';
import { profilePage } from './profile/profile.page';


export const settingsRouter: Routes = [
  {
    path: '',
    component: settingsPage,
  },
  {
    path: 'profile',
    component:profilePage
  }
]