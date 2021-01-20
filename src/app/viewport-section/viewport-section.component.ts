import { Component, ComponentRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CdkPortalOutletAttachedRef } from '@angular/cdk/portal';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

import { AppState, getGeneralStyles, getSection } from 'src/app/store/reducers';
import { GeneralStyles } from 'src/app/shared/models/general-styles.model';
import { ESection } from 'src/app/shared/enums/section.enum';
import { ViewComponent } from 'src/app/shared/models/viewComponent.model';
import { BaseUiComponent } from 'src/app/shared/components/base-ui/base-ui.component';

@Component({
  selector: 'app-viewport-section',
  templateUrl: './viewport-section.component.html',
  styleUrls: ['./viewport-section.component.scss']
})
export class ViewportSectionComponent implements OnInit {

  section: ESection;
  section$: Observable<ESection>;
  components: ViewComponent[] = [];
  id = 0;
  generalStyles$: Observable<GeneralStyles>;

  foo(ref: CdkPortalOutletAttachedRef): void {
    ref = ref as ComponentRef<BaseUiComponent>;
    ref.instance.isTemplate = false;
  }

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.generalStyles$ = this.store.select(getGeneralStyles);
    this.section$ = this.store.select(getSection) as Observable<ESection>;
    this.section$.subscribe(res => this.section = res);
  }

  drop(event: CdkDragDrop<ViewComponent[]>): void {
    if (event.container.id === event.previousContainer.id) {
      if (!event.isPointerOverContainer) {
        this.components.splice(event.previousIndex, 1);
        return;
      }
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.components[event.currentIndex] = { ...this.components[event.currentIndex], id: ++this.id };
    }
  }

}
