import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyntacticTreeComponent } from './syntactic-tree.component';



@NgModule({
  declarations: [
    SyntacticTreeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SyntacticTreeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SyntacticTreeModule { }
