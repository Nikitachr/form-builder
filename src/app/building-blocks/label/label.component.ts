import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AppState } from 'src/app/store/reducers';
import { ComponentService } from 'src/app/shared/services/component.service';
import { EComponentType } from 'src/app/shared/enums/componentType.enum';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { BaseUiComponent } from 'src/app/building-blocks/base-ui/base-ui.component';
import { EAlignType } from 'src/app/shared/enums/align.enum';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent extends BaseUiComponent implements OnInit, OnDestroy {

  styles = {
    placeholder: 'Label',
    marginTop: 5,
    fontSize: 18,
    fontWeight: 400,
    color: '#000',
    align: EAlignType.Left
  };

  ComponentType = EComponentType.Label;

  initForm(): void {
    this.editForm = new FormGroup({
      placeholder: new FormControl('', [Validators.required]),
      marginTop: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      fontSize: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      fontWeight: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      color: new FormControl('', [Validators.required, this.validatorService.colorValidator()]),
      align: new FormControl('', [Validators.required])
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
