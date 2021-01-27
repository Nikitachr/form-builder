import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { StylesInjector } from 'src/app/shared/tokens/styles.token';
import { UIComponent } from 'src/app/shared/models/component.model';
import { AppState, getComponents } from 'src/app/core/store/reducers';
import { StylesInjectorService } from 'src/app/shared/services/styles-injector.service';

@Component({
  selector: 'app-templates-section',
  templateUrl: './templates-section.component.html',
  styleUrls: ['./templates-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TemplatesSectionComponent {

  templateComponents$ = this.store.select(getComponents);

  constructor(private store: Store<AppState>, private stylesInjectorService: StylesInjectorService) {
  }

  getInjectorById(id: number): Observable<StylesInjector> {
    return this.stylesInjectorService.getInjectorById(this.templateComponents$, id);
  }

  drop(event: CdkDragDrop<UIComponent[]>): void {
    if (event.container.id === event.previousContainer.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  noReturnPredicate(): boolean {
    return false;
  }

}
