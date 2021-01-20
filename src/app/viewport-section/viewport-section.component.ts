import {AfterViewInit, ChangeDetectionStrategy, Component, ComponentRef, InjectionToken, OnChanges, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {CdkPortalOutletAttachedRef, ComponentPortal} from '@angular/cdk/portal';
import {CdkDragDrop, copyArrayItem, moveItemInArray} from '@angular/cdk/drag-drop';

import {AppState, getComponents, getGeneralStyles, getSection} from '../store/reducers';
import {GeneralStyles} from '../shared/models/general-styles.model';
import {ESection} from '../shared/enums/section.enum';
import {UIComponent} from '../shared/models/component.model';

@Component({
  selector: 'app-viewport-section',
  templateUrl: './viewport-section.component.html',
  styleUrls: ['./viewport-section.component.scss']
})
export class ViewportSectionComponent implements OnInit, AfterViewInit {

  section: ESection | undefined;
  section$: Observable<ESection> | undefined;
  components: any[] = [];
  id = 0;
  generalStyles$: Observable<GeneralStyles> | undefined;

  foo(ref: CdkPortalOutletAttachedRef): void {
    ref = ref as ComponentRef<any>;
    ref.instance.isTemplate = false;
  }


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.generalStyles$ = this.store.select(getGeneralStyles);
    this.section$ = this.store.select(getSection) as Observable<ESection>;
    this.section$.subscribe(res => this.section = res);
  }

  ngAfterViewInit(): void {
  }

  drop(event: CdkDragDrop<string[]>): void {
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
      this.components[event.currentIndex] = { ...this.components[event.currentIndex], id: ++this.id};
    }
  }

}
