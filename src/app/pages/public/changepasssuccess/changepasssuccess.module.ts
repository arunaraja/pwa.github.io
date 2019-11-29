import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentModule } from '../../../services/component/component.module';
import { changepasssuccessPage } from './changepasssuccess.page';
const routes: Routes = [
  {
    path: '',
    component: changepasssuccessPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [changepasssuccessPage]
})
export class changepasssuccessPageModule {}
