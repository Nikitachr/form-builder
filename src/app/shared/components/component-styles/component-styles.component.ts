import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { UpdateComponent } from 'src/app/store/actions/actions';
import { AppState } from 'src/app/store/reducers';
import { UIComponent } from 'src/app/shared/models/component.model';
import { EComponentType } from 'src/app/shared/enums/componentType.enum';
import { EAlignType } from 'src/app/shared/enums/align.enum';

@Component({
  selector: 'app-component-styles',
  templateUrl: './component-styles.component.html',
  styleUrls: ['./component-styles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentStylesComponent implements OnInit {

  @Input() component: UIComponent;

  AlignType = EAlignType;
  ComponentType = EComponentType;
  form: FormGroup | undefined;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.initForm();
    this.form?.patchValue(this.component?.styles);
    this.form?.valueChanges.subscribe(() => this.updateStyles());
  }

  initForm(): void {
    this.form = _.cloneDeep(this.component?.editForm);
  }

  updateStyles(): void {
    if (this.form?.invalid) {
      return;
    }

    this.store.dispatch(new UpdateComponent({...this.component, styles: this.form?.value}));
  }

  colorChange(color: string, field: string): void {
    this.form?.get(field)?.setValue(color);
  }

  alignChange(type: EAlignType): void {
    this.form?.get('align')?.setValue(type);
  }

}
