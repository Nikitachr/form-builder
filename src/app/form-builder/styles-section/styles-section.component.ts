import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState, getSelectedComponent, getViewportComponents } from 'src/app/core/store/reducers';
import { UIComponent } from 'src/app/shared/models/component.model';
import { SelectComponentAction } from 'src/app/core/store/actions/actions';

@Component({
  selector: 'app-styles-section',
  templateUrl: './styles-section.component.html',
  styleUrls: ['./styles-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StylesSectionComponent implements OnInit {

  selectedComponent$ = this.store.select(getSelectedComponent);
  components$ = this.store.select(getViewportComponents);

  constructor(private store: Store<AppState>) { }
  ngOnInit(): void {
  }

  onExpand(id: number): void {
    this.store.dispatch(new SelectComponentAction(id));
  }

  identify(index: number, item: UIComponent): number{
    return item.id;
  }
}
