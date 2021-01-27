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
import { MatTreeModule } from '@angular/material/tree';
import { ColorPickerModule } from 'ngx-color-picker';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { ButtonComponent } from 'src/app/building-blocks/button/button.component';
import { InputComponent } from 'src/app/building-blocks/input/input.component';
import { CheckboxComponent } from 'src/app/building-blocks/checkbox/checkbox.component';
import { TextareaComponent} from 'src/app/building-blocks/textarea/textarea.component';
import { SelectComponent} from 'src/app/building-blocks/select/select.component';
import { AppComponent } from 'src/app/app.component';
import { StylesSectionComponent } from 'src/app/form-builder/styles-section/styles-section.component';
import { ViewportSectionComponent } from 'src/app/form-builder/viewport-section/viewport-section.component';
import { TemplatesSectionComponent } from 'src/app/form-builder/templates-section/templates-section.component';
import { environment } from 'src/environments/environment';
import { metaReducers, reducers } from 'src/app/core/store/reducers';
import { GeneralStylesComponent } from 'src/app/core/components/general-styles/general-styles.component';
import { ComponentStylesComponent } from 'src/app/core/components/component-styles/component-styles.component';
import { LabelComponent } from 'src/app/building-blocks/label/label.component';
import { RequestInterceptor } from 'src/app/shared/interceptors/http.inteceptor';
import { FormBuilderComponent } from 'src/app/form-builder/form-builder.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Effects } from 'src/app/core/store/effects/effect';
import { STYLES } from 'src/app/shared/tokens/styles.token';



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
    LabelComponent,
    FormBuilderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveComponentModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers, runtimeChecks: {
        strictStateImmutability: false
      }}),
    EffectsModule.forRoot([Effects]),
    MatExpansionModule,
    HttpClientModule,
    ColorPickerModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    {
      provide: STYLES,
      useValue: ''
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
