import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { AppState, getComponents, getSelectedComponent } from 'src/app/store/reducers';
import { UIComponent } from 'src/app/shared/models/component.model';
import { SelectComponentAction } from 'src/app/store/actions/actions';

@Component({
  selector: 'app-styles-section',
  templateUrl: './styles-section.component.html',
  styleUrls: ['./styles-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StylesSectionComponent implements OnInit {

  selectedComponent$: Observable<number>;
  components$: Observable<UIComponent[]>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.components$ = this.store.select(getComponents).pipe(delay(0));
    this.selectedComponent$ = this.store.select(getSelectedComponent).pipe(delay(0));
  }

  onExpand(id: number): void {
    this.store.dispatch(new SelectComponentAction(id));
  }

  identify(index: number, item: UIComponent): number{
    return item.id;
  }
}
