import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AppState, getComponents, getSelectedComponent } from '../store/reducers';
import { UIComponent } from '../shared/models/component.model';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-styles-section',
  templateUrl: './styles-section.component.html',
  styleUrls: ['./styles-section.component.scss']
})
export class StylesSectionComponent implements OnInit {

  selectedComponent$: Observable<number> | undefined;
  components$: Observable<UIComponent[]> | undefined;
  array: any[] | undefined;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.components$ = this.store.select(getComponents).pipe(delay(0));
    // @ts-ignore
    this.selectedComponent$ = this.store.select(getSelectedComponent).pipe(delay(0));
  }

  identify(index: any, item: any): number{
    return item.id;
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.container.id === event.previousContainer.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      event.previousContainer.data = [];
    }
  }
}
