import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentModule } from '../../../services/component/component.module';
import { homePage } from './home.page';
const routes: Routes = [
  {
    path: '',
    component: homePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [homePage]
})
export class homePageModule {}
