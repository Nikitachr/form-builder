import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import {AppState, getComponentByType} from '../../store/reducers';
import {EComponentType} from '../enums/componentType.enum';
import {Observable} from 'rxjs';
import {UIComponent} from '../models/component.model';
import {first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  id = 0;

constructor(private store: Store<AppState>) { }

  getId(): number {
    return this.id++;
  }

  getName(type: EComponentType): Observable<string> {
  return this.store.select(getComponentByType(type)).pipe(
    first(),
    map((res: any) => res.length ? type + ' ' + res.length : type)
  );
  }
}

