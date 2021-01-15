import {Component, OnInit} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import { Store } from '@ngrx/store';
import {ChangeSection, LoadComponents, UpdateComponents} from './store/actions/actions';
import {AppState, ComponentState, getIsDragging} from './store/reducers';
import {ESection} from './shared/enums/section.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'form-builder';

  isDragging: boolean | undefined;
  isDragging$: Observable<boolean>;

  Section = ESection;

  constructor(private store: Store<AppState>) {
    this.isDragging$ = this.store.select(getIsDragging);
    this.isDragging$.subscribe(res => this.isDragging = res);
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

  enter(section: ESection): void {
    if (this.isDragging) {
      this.store.dispatch(new ChangeSection(section));
    }
  }
}

