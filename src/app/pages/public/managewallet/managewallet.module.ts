import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentModule } from '../../../services/component/component.module';
import { managewalletPage } from './managewallet.page';
import { walletaddPage } from './walletadd/walletadd.page';
import { walletRouter } from './managewallet.route';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentModule,
    RouterModule.forChild(walletRouter),
  ],
  declarations: [managewalletPage,walletaddPage]
})
export class managewalletPageModule {}
