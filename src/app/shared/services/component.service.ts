import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { EComponentType } from 'src/app/shared/enums/component-type.enum';
import { ComponentStylesModel } from 'src/app/shared/models/component-styles.model';
import { FormGroup } from '@angular/forms';
import { AddComponent } from 'src/app/store/actions/actions';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  constructor(public store: Store<AppState>) { }
}
