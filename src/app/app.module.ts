import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SharedLibsModule } from './shared/shared-libs.module';
import { StatusModule } from './components/status/status.module';
import { SyntacticLanguageModule } from './components/syntactic-language/syntactic-language.module';
import { SyntacticTreeModule } from './components/syntactic-tree/syntactic-tree.module';
import { WordEditorModule } from './components/word-editor/word-editor.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SharedLibsModule,
    StatusModule,
    SyntacticLanguageModule,
    SyntacticTreeModule,
    WordEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
