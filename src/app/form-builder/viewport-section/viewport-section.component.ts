import { ChangeDetectionStrategy, Component, ComponentRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CdkPortalOutletAttachedRef } from '@angular/cdk/portal';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

import { AppState, getGeneralStyles } from 'src/app/store/reducers';
import { GeneralStyles } from 'src/app/shared/models/general-styles.model';
import { ViewComponent } from 'src/app/shared/models/view-component.model';
import { BaseUiComponent } from 'src/app/building-blocks/base-ui/base-ui.component';
import { StylesTokenService } from 'src/app/shared/services/styles-token.service';
import { StylesInjector } from 'src/app/shared/tokens/styles.token';
import { UIComponent } from 'src/app/shared/models/component.model';
import { AddComponent } from 'src/app/store/actions/actions';

@Component({
  selector: 'app-viewport-section',
  templateUrl: './viewport-section.component.html',
  styleUrls: ['./viewport-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewportSectionComponent implements OnInit {

  components: any[] = [];
  id = 6;
  generalStyles$ = this.store.select(getGeneralStyles);

  constructor(private store: Store<AppState>, private stylesTokenService: StylesTokenService) { }

  ngOnInit(): void {
  }

  getInjectorById(id: number): Observable<StylesInjector> {
    return this.stylesTokenService.getInjectorById(id);
  }

  drop(event: CdkDragDrop<any[]>): void {
    console.log(event.previousContainer.data[event.previousIndex]);
    this.store.dispatch(new AddComponent({...event.previousContainer.data[event.previousIndex], id: this.id++}));
    if (event.container.id === event.previousContainer.id) {
      if (!event.isPointerOverContainer) {
        this.components.splice(event.previousIndex, 1);
        return;
      }
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //this.store.dispatch(new AddComponent(event.container.data));
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      //this.components[event.currentIndex] = { ...this.components[event.currentIndex], id: ++this.id };
    }
  }


}
