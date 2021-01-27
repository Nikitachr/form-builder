import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Store } from '@ngrx/store';

import { UpdateComponent } from 'src/app/core/store/actions/actions';
import { AppState } from 'src/app/core/store/reducers';
import { UIComponent } from 'src/app/shared/models/component.model';
import { EAlignType } from 'src/app/shared/enums/align.enum';
import { ValidatorService } from 'src/app/shared/services/validator.service';

@Component({
  selector: 'app-component-styles',
  templateUrl: './component-styles.component.html',
  styleUrls: ['./component-styles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentStylesComponent implements OnInit {

  @Input() component: UIComponent;

  AlignType = EAlignType;
  form: FormGroup;

  constructor(private store: Store<AppState>, private validatorService: ValidatorService) { }

  ngOnInit(): void {
    this.initForm();
    this.form?.patchValue(this.component?.styles);
    this.form?.valueChanges.subscribe(() => this.updateStyles());
  }

  updateStyles(): void {
    if (this.form?.invalid) {
      return;
    }
    this.store.dispatch(new UpdateComponent({ ...this.component, styles: this.form?.value }));
  }

  colorChange(color: string, field: string): void {
    this.form?.get(field)?.setValue(color);
  }

  alignChange(type: EAlignType): void {
    this.form?.get('align')?.setValue(type);
  }

  initForm(): void {
    const newGroup = {};
    for (const i in this.component.styles) {
      let validator: ValidatorFn;

      if (i.includes('Color')) {
        validator = this.validatorService.colorValidator();
      } else if (i.includes('align') || i.includes('placeholder')) {
        validator = null;
      } else {
        validator = this.validatorService.numberValidator();
      }

      newGroup[i] = new FormControl('',  validator);
    }
    this.form = new FormGroup(newGroup);
  }

}
