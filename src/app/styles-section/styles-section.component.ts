import { Component, OnInit } from '@angular/core';
import {AppState, ComponentState, getComponents} from '../store/reducers';
import {State, Store} from '@ngrx/store';
import {ComponentStyles} from '../shared/models/component-styles';
import {Observable} from 'rxjs';
import {UpdateComponents} from '../store/actions/actions';

@Component({
  selector: 'app-styles-section',
  templateUrl: './styles-section.component.html',
  styleUrls: ['./styles-section.component.scss']
})
export class StylesSectionComponent implements OnInit {

  constructor(private store: Store<ComponentState>) { }

  ngOnInit(): void {
  }

  change(event: any): void {
  }

}
