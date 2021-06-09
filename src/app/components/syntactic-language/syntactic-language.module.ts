import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyntacticLanguageComponent } from './syntactic-language.component';



@NgModule({
  declarations: [
    SyntacticLanguageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SyntacticLanguageComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SyntacticLanguageModule { }
