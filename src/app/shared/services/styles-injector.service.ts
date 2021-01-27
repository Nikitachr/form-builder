import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';

import { UIComponent } from 'src/app/shared/models/component.model';
import { STYLES, StylesInjector } from 'src/app/shared/tokens/styles.token';

@Injectable({
  providedIn: 'root'
})
export class StylesInjectorService {

  constructor(private injector: Injector) {

  }

  getInjectors(components$: Observable<UIComponent[]>): Observable<StylesInjector[]> {
    return components$.pipe(
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

  getInjectorById(components$: Observable<UIComponent[]>, id: number): Observable<StylesInjector> {
    return this.getInjectors(components$).pipe(
      map(injectors => injectors.filter(injector => injector.id === id)[0])
    );
  }
}
