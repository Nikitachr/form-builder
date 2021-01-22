import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

import { AppState } from 'src/app/store/reducers';
import { ComponentService } from 'src/app/shared/services/component.service';
import { EComponentType } from 'src/app/shared/enums/componentType.enum';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { BaseUiComponent } from 'src/app/core/components/base-ui/base-ui.component';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: TextareaComponent,
    multi: true
  }]
})
export class TextareaComponent extends BaseUiComponent implements OnInit, OnDestroy, ControlValueAccessor {

  value: string;

  styles = {
    placeholder: 'Text area',
    width: 300,
    height: 100,
    paddingTop: 10,
    paddingLeft: 10,
    marginTop: 5,
    required: true,
    fontSize: 18,
    fontWeight: 400,
    color: '#000',
    bgColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000'
  };

  ComponentType = EComponentType.Textarea;

  initForm(): void {
    this.editForm = new FormGroup({
      placeholder: new FormControl('', [Validators.required]),
      width: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      height: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      paddingTop: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      paddingLeft: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      marginTop: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      required: new FormControl('', [Validators.required]),
      fontSize: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      fontWeight: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      color: new FormControl('', [Validators.required, this.validatorService.colorValidator()]),
      bgColor: new FormControl('', [Validators.required, this.validatorService.colorValidator()]),
      borderRadius: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      borderWidth: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      borderColor: new FormControl('', [Validators.required, this.validatorService.colorValidator()]),
    });
  }

  constructor(public idService: ComponentService, public store: Store<AppState>, public validatorService: ValidatorService) {
    super(idService, store, validatorService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
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
