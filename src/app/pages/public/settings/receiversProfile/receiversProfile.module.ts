import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentModule } from '../../../../services/component/component.module';
import { receiversProfilePage } from './receiversProfile.page';

const routes: Routes = [
  {
    path: '',
    component: receiversProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class receiversProfilePageModule {}
