import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UpdateComponent } from 'src/app/store/actions/actions';
import { AppState } from 'src/app/store/reducers';
import { UIComponent } from '../../models/component.model';

@Component({
  selector: 'app-component-styles',
  templateUrl: './component-styles.component.html',
  styleUrls: ['./component-styles.component.scss']
})
export class ComponentStylesComponent implements OnInit {

  @Input() component: UIComponent | undefined;

  form: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.initForm();
    this.form.patchValue(this.component?.styles as UIComponent);
    this.form.valueChanges.subscribe(() => this.updateStyles());
  }

  initForm(): void {
    this.form = new FormGroup({
      placeholder: new FormControl('', [Validators.required]),
      width: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      height: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      required: new FormControl('', [Validators.required]),
      fontSize: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      fontWeight: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      color: new FormControl('', [Validators.required, Validators.pattern(/^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/)]),
      bgColor: new FormControl('', [Validators.required, Validators.pattern(/^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/)]),
      borderRadius: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      borderWidth: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      borderColor: new FormControl('', [Validators.required, Validators.pattern(/^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/)]),
    });
  }

  updateStyles(): void {
    if (this.form?.invalid) {
      return;
    }
    this.store.dispatch(new UpdateComponent({...this.component as UIComponent, styles: this.form?.value}));
  }

  colorChange(color: string, field: string): void {
    this.form.get(field)?.setValue(color);
  }

}
