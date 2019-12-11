import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentModule } from '../../../services/component/component.module';
import { forgotpasswordPage } from './forgotpassword.page';

const routes: Routes = [
  {
    path: '',
    component: forgotpasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [forgotpasswordPage]
})
export class forgotpasswordPageModule {}
