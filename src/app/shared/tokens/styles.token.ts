import { InjectionToken, Injector } from '@angular/core';
import { Observable } from 'rxjs';

import { ComponentStylesModel } from 'src/app/shared/models/component-styles.model';

export interface StylesInjector {
  injector: Injector;
  id: number;
}

export const STYLES = new InjectionToken<Observable<ComponentStylesModel>>(
  'Styles stream',
);
