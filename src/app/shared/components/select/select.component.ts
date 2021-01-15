import { Component, Input, OnInit } from '@angular/core';

import { ComponentStyles } from '../../models/component-styles';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/reducers';
import {AddComponent} from '../../../store/actions/actions';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() styles: ComponentStyles = {
    placeholder: 'Select',
    width: 100,
    height: 36,
    required: true,
    fontSize: 18,
    fontWeight: 400,
    color: '#000',
    bgColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000'
  };

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new AddComponent(this.styles));
  }

}
