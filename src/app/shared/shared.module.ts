import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SafePipe } from 'src/app/shared/pipes/safe.pipe';

@NgModule({
  declarations: [ SafePipe ],
  imports: [
    CommonModule
  ],
  exports: [ SafePipe ]
})
export class SharedModule { }
