import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonComponent } from 'src/app/building-blocks/button/button.component';
import { CheckboxComponent } from 'src/app/building-blocks/checkbox/checkbox.component';
import { InputComponent } from 'src/app/building-blocks/input/input.component';
import { LabelComponent } from 'src/app/building-blocks/label/label.component';
import { SelectComponent } from 'src/app/building-blocks/select/select.component';
import { TextareaComponent } from 'src/app/building-blocks/textarea/textarea.component';



@NgModule({
  declarations: [
    ButtonComponent,
    CheckboxComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
    TextareaComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ButtonComponent,
    CheckboxComponent,
    InputComponent,
    LabelComponent,
    SelectComponent,
    TextareaComponent
  ]
})
export class BuildingBlocksModule { }
