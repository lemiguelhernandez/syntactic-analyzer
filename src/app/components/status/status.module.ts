import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status.component';



@NgModule({
  declarations: [
    StatusComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StatusComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StatusModule { }
