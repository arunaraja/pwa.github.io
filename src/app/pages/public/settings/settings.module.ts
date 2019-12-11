import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { settingsRouter } from './settings.route';
import { ComponentModule } from '../../../services/component/component.module';
import { settingsPage } from './settings.page';
import { profilePage } from './profile/profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentModule,
    RouterModule.forChild(settingsRouter)
  ],
  declarations: [settingsPage,profilePage]
})
export class settingsPageModule {}
