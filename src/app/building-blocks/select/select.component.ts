import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

import { AppState } from 'src/app/store/reducers';
import { EComponentType } from 'src/app/shared/enums/component-type.enum';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { BaseUiComponent } from 'src/app/building-blocks/base-ui/base-ui.component';
import { EAlignType } from 'src/app/shared/enums/align.enum';
import { ComponentService } from 'src/app/shared/services/component.service';
import { STYLES } from 'src/app/shared/tokens/styles.token';
import { ComponentStylesModel } from 'src/app/shared/models/component-styles.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: SelectComponent,
    multi: true
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit, OnDestroy, ControlValueAccessor {

  value = 'first';

  constructor(public store: Store<AppState>, @Inject(STYLES) public styles: ComponentStylesModel) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  onChange(_: any): void {}

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn): void {
    this.onChange = fn;
  }

  registerOnTouched(): void {
  }

}
