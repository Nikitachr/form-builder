import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first, map, pairwise } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AppState, getGeneralStyles } from 'src/app/core/store/reducers';
import { UpdateGeneralStylesAction } from 'src/app/core/store/actions/actions';

@Component({
  selector: 'app-general-styles',
  templateUrl: './general-styles.component.html',
  styleUrls: ['./general-styles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralStylesComponent implements OnInit {

  generalStyles$ = this.store.select(getGeneralStyles).pipe(first());
  customPopupStyles$: Observable<any>;
  value: string;
  blob: Blob;
  form: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.initForm();
    this.generalStyles$.pipe(first()).subscribe(res => this.form.patchValue(res));
    this.form.valueChanges.subscribe(res => this.updateStyles());
    this.initStylesTransform();
  }

  initForm(): void {
    this.form = new FormGroup({
      paddingLeft: new FormControl('', [Validators.required]),
      paddingTop: new FormControl('', [Validators.required]),
      backgroundColor: new FormControl('', [Validators.required]),
      margins: new FormControl('', [Validators.required]),
      blob: new FormControl('')
    });
  }

  updateStyles(): void {
    if (this.form.invalid) {
      return;
    }
    this.store.dispatch(new UpdateGeneralStylesAction(this.form.value));
  }

  colorChange(color: string): void {
    this.form.get('backgroundColor')?.setValue(color);
  }

  private initStylesTransform(): void {
    this.customPopupStyles$ = this.form.get('blob').valueChanges.pipe(
      map((value) => {
        return URL.createObjectURL(new Blob([value], { type: 'text/css' }));
      }),
      pairwise(),
      map(([prev, current]) => {
        if (prev) {
          URL.revokeObjectURL(prev);
        }
        return current;
      })
    );
  }

}
