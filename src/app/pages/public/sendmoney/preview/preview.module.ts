import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentModule } from '../../../../services/component/component.module';
import { previewPage } from './preview.page';
const routes: Routes = [
  {
    path: '',
    component: previewPage
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
export class previewPageModule {}
