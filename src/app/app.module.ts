import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { ReactiveComponentModule } from '@ngrx/component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from 'src/app/app.component';
import { StylesSectionComponent } from 'src/app/form-builder/styles-section/styles-section.component';
import { ViewportSectionComponent } from 'src/app/form-builder/viewport-section/viewport-section.component';
import { TemplatesSectionComponent } from 'src/app/form-builder/templates-section/templates-section.component';
import { environment } from 'src/environments/environment';
import { metaReducers, reducers } from 'src/app/core/store/reducers';
import { RequestInterceptor } from 'src/app/shared/interceptors/http.inteceptor';
import { FormBuilderComponent } from 'src/app/form-builder/form-builder.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Effects } from 'src/app/core/store/effects/effect';
import { STYLES } from 'src/app/shared/tokens/styles.token';
import { CoreModule } from 'src/app/core/core.module';
import { BuildingBlocksModule } from 'src/app/building-blocks/building-blocks.module';



@NgModule({
  declarations: [
    AppComponent,
    StylesSectionComponent,
    ViewportSectionComponent,
    TemplatesSectionComponent,
    FormBuilderComponent,
  ],
  imports: [
    CoreModule,
    BuildingBlocksModule,
    BrowserModule,
    ReactiveComponentModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers, runtimeChecks: {
        strictStateImmutability: false
      }}),
    EffectsModule.forRoot([Effects]),
    HttpClientModule,
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
