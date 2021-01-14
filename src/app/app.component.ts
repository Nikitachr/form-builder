import {Component, OnInit} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import { Store } from '@ngrx/store';
import {LoadComponents, UpdateComponents} from './store/actions/actions';
import {ComponentState} from './store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'form-builder';

  constructor(private store: Store<ComponentState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadComponents([{
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
    }]));
  }

}

