import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveComponentModule } from '@ngrx/component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';

import { ComponentStylesComponent } from 'src/app/core/components/component-styles/component-styles.component';
import { GeneralStylesComponent } from 'src/app/core/components/general-styles/general-styles.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
  declarations: [
    ComponentStylesComponent,
    GeneralStylesComponent
  ],
  imports: [
    ReactiveComponentModule,
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    ColorPickerModule,
    MatExpansionModule
  ],
  exports: [
    ComponentStylesComponent,
    GeneralStylesComponent
  ]
})
export class CoreModule { }
