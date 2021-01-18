import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveComponentModule } from '@ngrx/component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { PortalModule } from '@angular/cdk/portal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { ColorPickerModule } from 'ngx-color-picker';

import { ButtonComponent } from './shared/components/button/button.component';
import { InputComponent } from './shared/components/input/input.component';
import { CheckboxComponent } from './shared/components/checkbox/checkbox.component';
import { TextareaComponent } from './shared/components/textarea/textarea.component';
import { SelectComponent } from './shared/components/select/select.component';
import { AppComponent } from './app.component';
import { StylesSectionComponent } from './styles-section/styles-section.component';
import { ViewportSectionComponent } from './viewport-section/viewport-section.component';
import { TemplatesSectionComponent } from './templates-section/templates-section.component';
import { environment } from '../environments/environment';
import { metaReducers, reducers } from './store/reducers';
import { GeneralStylesComponent } from './shared/components/general-styles/general-styles.component';
import { ComponentStylesComponent } from './shared/components/component-styles/component-styles.component';
import { LabelComponent } from './shared/components/label/label.component';


@NgModule({
  declarations: [
    AppComponent,
    ComponentStylesComponent,
    StylesSectionComponent,
    ViewportSectionComponent,
    TemplatesSectionComponent,
    ButtonComponent,
    InputComponent,
    CheckboxComponent,
    TextareaComponent,
    SelectComponent,
    GeneralStylesComponent,
    LabelComponent
  ],
  imports: [
    BrowserModule,
    ReactiveComponentModule,
    FormsModule,
    DragDropModule,
    BrowserAnimationsModule,
    PortalModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    MatButtonModule,
    MatExpansionModule,
    ColorPickerModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
