import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

import { AppState, getGeneralStyles, getViewportComponents } from 'src/app/core/store/reducers';
import { StylesInjectorService } from 'src/app/shared/services/styles-injector.service';
import { StylesInjector } from 'src/app/shared/tokens/styles.token';
import { AddComponentAction, DeleteComponentAction, SelectComponentAction } from 'src/app/core/store/actions/actions';
import { UIComponent } from 'src/app/shared/models/component.model';

@Component({
  selector: 'app-viewport-section',
  templateUrl: './viewport-section.component.html',
  styleUrls: ['./viewport-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewportSectionComponent {

  components: UIComponent[] = [];
  id = 0;
  generalStyles$ = this.store.select(getGeneralStyles);
  viewportComponents$ = this.store.select(getViewportComponents);

  constructor(private store: Store<AppState>, private stylesInjectorService: StylesInjectorService) { }

  getInjectorById(id: number): Observable<StylesInjector> {
    return this.stylesInjectorService.getInjectorById(this.viewportComponents$, id);
  }

  drop(event: CdkDragDrop<UIComponent[]>): void {
    if (event.container.id === event.previousContainer.id) {
      if (!event.isPointerOverContainer) {
        this.store.dispatch(new DeleteComponentAction(this.components[event.previousIndex].id));
        this.components.splice(event.previousIndex, 1);
        return;
      }
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.store.dispatch(new AddComponentAction({...event.previousContainer.data[event.previousIndex], id: ++this.id}));
      copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.components[event.currentIndex] = { ...this.components[event.currentIndex], id: this.id };
    }
  }

  select(id: number): void {
    this.store.dispatch(new SelectComponentAction(id));
  }

}
