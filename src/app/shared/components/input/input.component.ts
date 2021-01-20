import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ComponentStyles } from 'src/app/shared/models/component-styles';
import { AppState } from 'src/app/store/reducers';
import { ComponentService } from 'src/app/shared/services/component.service';
import { EComponentType } from 'src/app/shared/enums/componentType.enum';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { BaseUiComponent } from 'src/app/shared/components/base-ui/base-ui.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent extends BaseUiComponent{

  styles = {
    width: 300,
    placeholder: 'Input',
    height: 36,
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

  ComponentType = EComponentType.Input;

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

}
