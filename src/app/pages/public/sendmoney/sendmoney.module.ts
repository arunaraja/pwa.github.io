import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentModule } from '../../../services/component/component.module';
import { sendmoneyPage } from './sendmoney.page';
import { previewPage } from './preview/preview.page';
import { sendMoneyRouter } from './sendmoney.route';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentModule,
    RouterModule.forChild(sendMoneyRouter)
  ],
  declarations: [sendmoneyPage,previewPage]
})
export class sendmoneyPageModule {}
