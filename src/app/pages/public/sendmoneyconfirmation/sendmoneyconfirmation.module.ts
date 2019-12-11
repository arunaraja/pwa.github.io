import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentModule } from '../../../services/component/component.module';
import { sendmoneyconfirmationPage } from './sendmoneyconfirmation.page';
const routes: Routes = [
  {
    path: '',
    component: sendmoneyconfirmationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [sendmoneyconfirmationPage]
})
export class sendmoneyconfirmationPageModule {}
