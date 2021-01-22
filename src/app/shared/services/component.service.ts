import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { first, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AppState, getComponentByType } from 'src/app/store/reducers';
import { EComponentType } from 'src/app/shared/enums/componentType.enum';
import { UIComponent } from 'src/app/shared/models/component.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  //id = 0;

constructor(private store: Store<AppState>) { }

  //getId(): number {
  //  return this.id++;
  //}

  getName(type: EComponentType): Observable<string> {
    return this.store.select(getComponentByType(type)).pipe(
      first(),
      map((res: UIComponent[]) => res.length ? type + ' ' + res.length : type)
    );
  }
}

