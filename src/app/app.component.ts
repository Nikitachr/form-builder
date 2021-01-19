import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ChangeSection } from './store/actions/actions';
import { AppState } from './store/reducers';
import { ESection } from './shared/enums/section.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'form-builder';
  Section = ESection;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {
  }

  enter(section: ESection): void {
    this.store.dispatch(new ChangeSection(section));
  }
}

