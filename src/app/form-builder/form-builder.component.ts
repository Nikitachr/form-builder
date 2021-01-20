import { Component, OnInit } from '@angular/core';
import {ESection} from '../shared/enums/section.enum';
import {Store} from '@ngrx/store';
import {AppState} from '../store/reducers';
import {ChangeSection} from '../store/actions/actions';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  Section = ESection;

  constructor(private store: Store<AppState>, private authService: AuthService) {
  //this.authService.login({ email: 'test@gmail.com', password: 'test' }).subscribe(res => localStorage.setItem('token', res.accessToken));

  }

  ngOnInit(): void {

  }

  enter(section: ESection): void {
    this.store.dispatch(new ChangeSection(section));
  }

}
