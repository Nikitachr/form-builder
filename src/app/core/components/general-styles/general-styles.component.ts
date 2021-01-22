import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AppState, getGeneralStyles } from 'src/app/store/reducers';
import { GeneralStyles } from 'src/app/shared/models/general-styles.model';
import { UpdateGeneralStyles } from 'src/app/store/actions/actions';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-general-styles',
  templateUrl: './general-styles.component.html',
  styleUrls: ['./general-styles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralStylesComponent implements OnInit {

  generalStyles$?: Observable<GeneralStyles>;

  form: FormGroup | undefined;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.initForm();
    this.generalStyles$ = this.store.select(getGeneralStyles);
    this.generalStyles$.pipe(first()).subscribe(res =>  this.form?.patchValue(res));
    this.form?.valueChanges.subscribe(() => this.updateStyles());
  }

  initForm(): void {
    this.form = new FormGroup({
      paddingLeft: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      paddingTop: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      backgroundColor: new FormControl('', [Validators.required, Validators.pattern(/^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/)]),
      margins: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])
    });
  }

  updateStyles(): void {
    if (this.form?.invalid) {
      return;
    }
    this.store.dispatch(new UpdateGeneralStyles(this.form?.value));
  }

  colorChange(color: string): void {
    this.form?.get('backgroundColor')?.setValue(color);
  }

}
