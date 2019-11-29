import { NgModule } from '@angular/core';
import {ShowerrormessageComponent} from './show-error';
import { CommonModule } from '@angular/common';

@NgModule({
  imports:[CommonModule],
  declarations: [ShowerrormessageComponent],
  exports:[ShowerrormessageComponent]
})
export class ComponentModule {}
