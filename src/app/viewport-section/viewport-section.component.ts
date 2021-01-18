import { AfterViewInit, Component, ComponentRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CdkPortalOutletAttachedRef, ComponentPortal } from '@angular/cdk/portal';
import { CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

import { AppState, getGeneralStyles } from '../store/reducers';
import { GeneralStyles } from '../shared/models/general-styles.model';

@Component({
  selector: 'app-viewport-section',
  templateUrl: './viewport-section.component.html',
  styleUrls: ['./viewport-section.component.scss']
})
export class ViewportSectionComponent implements OnInit, AfterViewInit {

  componentPortal: ComponentPortal<any>[] = [];
  generalStyles$: Observable<GeneralStyles> | undefined;

  foo(ref: CdkPortalOutletAttachedRef): void {
    ref = ref as ComponentRef<any>;
    ref.instance.isTemplate = false;
  }


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.generalStyles$ = this.store.select(getGeneralStyles);
  }

  ngAfterViewInit(): void {
  }

  addComponent(component: any): void {
    this.componentPortal.push(new ComponentPortal(component));
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.container.id === event.previousContainer.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
