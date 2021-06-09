import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ChipsModule } from 'primeng/chips';

@NgModule({
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    OverlayPanelModule,
    InputTextModule,
    ButtonModule,
    SidebarModule,
    DialogModule,
    ChipsModule
  ]
})
export class SharedLibsModule { }
