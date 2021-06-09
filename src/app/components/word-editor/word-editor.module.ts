import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordEditorComponent } from './word-editor.component';
import { SharedLibsModule } from 'src/app/shared/shared-libs.module';

@NgModule({
  declarations: [
    WordEditorComponent
  ],
  imports: [
    CommonModule,
    SharedLibsModule
  ],
  exports: [
    WordEditorComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class WordEditorModule { }
