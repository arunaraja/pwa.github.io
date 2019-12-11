import { NgModule } from '@angular/core';
import {ShowerrormessageComponent} from './show-error';
import {NumberDirective} from './numbers-only.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports:[CommonModule],
  declarations: [ShowerrormessageComponent,NumberDirective],
  exports:[ShowerrormessageComponent,NumberDirective]
})
export class ComponentModule {}
