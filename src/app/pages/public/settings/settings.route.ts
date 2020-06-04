import { Routes } from "@angular/router";
import { settingsPage } from './settings.page';
import { profilePage } from './profile/profile.page';
import { profileeditPage } from './profile/profileedit.page';
import { receiversProfilePage } from './receiversProfile/receiversProfile.page';
import { receiversprofileaddPage } from './receiversProfile/receiversProfileAdd.page';
import { receiversprofileeditPage } from './receiversProfile/receiversProfileEdit.page';


export const settingsRouter: Routes = [
  {
    path: '',
    component: settingsPage,
  },
  {
    path: 'profile',
    component:profilePage
  },
  {
    path: 'editprofile',
    component:profileeditPage
  },
  {
    path: 'receiversProfile',
    component:receiversProfilePage
  },
  {
    path: 'receiversAddProfile',
    component:receiversprofileaddPage
  },
  {
    path: 'receiversEditProfile',
    component:receiversprofileeditPage
  },
 
]