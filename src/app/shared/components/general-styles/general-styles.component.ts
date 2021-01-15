import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState, getGeneralStyles} from '../../../store/reducers';
import {Observable} from 'rxjs';
import {GeneralStyles} from '../../models/general-styles.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UpdateGeneralStyles} from '../../../store/actions/actions';

@Component({
  selector: 'app-general-styles',
  templateUrl: './general-styles.component.html',
  styleUrls: ['./general-styles.component.scss']
})
export class GeneralStylesComponent implements OnInit {

  generalStyles$: Observable<GeneralStyles> | undefined;
  generalStyles: GeneralStyles | undefined;

  form: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.generalStyles$ = this.store.select(getGeneralStyles);
    this.generalStyles$.subscribe(res => this.generalStyles = res);
    this.initForm();
    this.form.patchValue(this.generalStyles as GeneralStyles);
    this.form.valueChanges.subscribe(() => this.updateStyles());
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
    this.form.get('backgroundColor')?.setValue(color);
  }

}