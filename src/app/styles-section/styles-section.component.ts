import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AppState, getComponents, getSelectedComponent } from '../store/reducers';
import { UIComponent } from '../shared/models/component.model';
import {CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {SelectComponentAction} from '../store/actions/actions';

@Component({
  selector: 'app-styles-section',
  templateUrl: './styles-section.component.html',
  styleUrls: ['./styles-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  onExpand(component: UIComponent): void {
    this.store.dispatch(new SelectComponentAction(component.id));
  }

  identify(index: any, item: any): number{
    return item.id;
  }
}
