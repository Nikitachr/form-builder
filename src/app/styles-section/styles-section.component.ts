import { Component, OnInit } from '@angular/core';
import {AppState, ComponentState, getComponents} from '../store/reducers';
import {State, Store} from '@ngrx/store';
import {ComponentStyles} from '../shared/models/component-styles';
import {Observable} from 'rxjs';
import { UIComponent } from '../shared/models/component.model';

@Component({
  selector: 'app-styles-section',
  templateUrl: './styles-section.component.html',
  styleUrls: ['./styles-section.component.scss']
})
export class StylesSectionComponent implements OnInit {

  components$: Observable<UIComponent[]> 

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.components$ = this.store.select(getComponents)
  }

  identify(index, item){
    return item.id;
  }
}
