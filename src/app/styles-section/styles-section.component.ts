import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AppState, getComponents, getSelectedComponent } from '../store/reducers';
import { UIComponent } from '../shared/models/component.model';

@Component({
  selector: 'app-styles-section',
  templateUrl: './styles-section.component.html',
  styleUrls: ['./styles-section.component.scss']
})
export class StylesSectionComponent implements OnInit {

  selectedComponent$: Observable<UIComponent> | undefined;
  components$: Observable<UIComponent[]> | undefined;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.components$ = this.store.select(getComponents).pipe(delay(0));
    // @ts-ignore
    this.selectedComponent$ = this.store.select(getSelectedComponent).pipe(delay(0));
  }

  identify(index: any, item: any): number{
    return item.id;
  }
}
