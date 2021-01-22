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

import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';
import { CheckboxComponent } from 'src/app/shared/components/checkbox/checkbox.component';
import { TextareaComponent} from 'src/app/shared/components/textarea/textarea.component';
import { SelectComponent} from 'src/app/shared/components/select/select.component';
import { AppComponent } from 'src/app/app.component';
import { StylesSectionComponent } from 'src/app/styles-section/styles-section.component';
import { ViewportSectionComponent } from 'src/app/viewport-section/viewport-section.component';
import { TemplatesSectionComponent } from 'src/app/templates-section/templates-section.component';
import { environment } from 'src/environments/environment';
import { metaReducers, reducers } from 'src/app/store/reducers';
import { GeneralStylesComponent } from 'src/app/core/components/general-styles/general-styles.component';
import { ComponentStylesComponent } from 'src/app/core/components/component-styles/component-styles.component';
import { LabelComponent } from 'src/app/shared/components/label/label.component';
import { RequestInterceptor } from 'src/app/shared/interceptors/http.inteceptor';
import { FormBuilderComponent } from 'src/app/form-builder/form-builder.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

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
    FormBuilderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveComponentModule,
    FormsModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    PortalModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    MatButtonModule,
    MatExpansionModule,
    MatTreeModule,
    HttpClientModule,
    ColorPickerModule,
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
