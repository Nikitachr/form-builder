import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ESection } from 'src/app/shared/enums/section.enum';
import { AppState } from 'src/app/store/reducers';
import { ChangeSection } from 'src/app/store/actions/actions';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  Section = ESection;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit(): void {

  }

  enter(section: ESection): void {
    this.store.dispatch(new ChangeSection(section));
  }

}
