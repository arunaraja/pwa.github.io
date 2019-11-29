import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentModule } from '../../../services/component/component.module';
import { thankyouPage } from './thankyou.page';
const routes: Routes = [
  {
    path: '',
    component: thankyouPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [thankyouPage]
})
export class thankyouPageModule {}
