import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StylesSectionComponent } from './styles-section/styles-section.component';
import { ViewportSectionComponent } from './viewport-section/viewport-section.component';
import { TemplatesSectionComponent } from './templates-section/templates-section.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ButtonComponent } from './shared/components/button/button.component';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    StylesSectionComponent,
    ViewportSectionComponent,
    TemplatesSectionComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, {}),
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
