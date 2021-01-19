import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as _ from 'lodash';

import {UpdateComponent} from 'src/app/store/actions/actions';
import {AppState} from 'src/app/store/reducers';
import {UIComponent} from '../../models/component.model';
import {EComponentType} from '../../enums/componentType.enum';
import {EAlignType} from '../../enums/align.enum';
import {ReplaySubject} from 'rxjs';
import {FlatTreeControl} from '@angular/cdk/tree';

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-component-styles',
  templateUrl: './component-styles.component.html',
  styleUrls: ['./component-styles.component.scss']
})
export class ComponentStylesComponent implements OnInit {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  @Input() component: UIComponent;

  AlignType = EAlignType;
  ComponentType = EComponentType;
  form: FormGroup | undefined;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.initForm();
    this.form?.patchValue(this.component?.styles as UIComponent);
    this.form?.valueChanges.subscribe(() => this.updateStyles());
  }

  initForm(): void {
    this.form = _.cloneDeep(this.component?.editForm);
  }

  updateStyles(): void {
    if (this.form?.invalid) {
      return;
    }

    this.store.dispatch(new UpdateComponent({...this.component as UIComponent, styles: this.form?.value}));
  }

  colorChange(color: string, field: string): void {
    this.form?.get(field)?.setValue(color);
  }

  alignChange(type: EAlignType): void {
    this.form?.get('align')?.setValue(type);
  }

}
