import { Store } from '@ngrx/store';
import { AppState, getComponents } from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { ComponentStylesModel } from 'src/app/shared/models/component-styles.model';
import { map } from 'rxjs/operators';
import { UIComponent } from 'src/app/shared/models/component.model';
import { Injectable, Injector } from '@angular/core';
import { STYLES, StylesInjector } from 'src/app/shared/tokens/styles.token';

@Injectable({
  providedIn: 'root'
})
export class StylesTokenService {

  components$ = this.store.select(getComponents);

  constructor(public store: Store<AppState>, private injector: Injector) {
    console.log('construct');
  }

  getInjectors(): Observable<StylesInjector[]> {
    return this.components$.pipe(
      map(components => components.map(
        (component: UIComponent) => ({
          injector: Injector.create({
            providers: [{provide: STYLES, useValue: component.styles}],
            parent: this.injector,
          }),
          id: component.id,
        })
        )
      ),
    );
  }

  getInjectorById(id: number): Observable<StylesInjector> {
    return this.getInjectors().pipe(
      map(injectors => injectors.filter(injector => injector.id === id)[0])
    );
  }
}
