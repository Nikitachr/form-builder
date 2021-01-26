import { Component, OnInit } from '@angular/core';
import { AppState, getComponents, getGeneralStyles } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { LoadComponents, LoginAction } from 'src/app/store/actions/actions';
import { EComponentType } from 'src/app/shared/enums/component-type.enum';
import {
  buttonStyles,
  checkboxStyles,
  inputStyles,
  labelStyles,
  selectStyles,
  textareaStyles
} from 'src/app/shared/mock-data/default-styles';
import { ButtonComponent } from 'src/app/building-blocks/button/button.component';
import { InputComponent } from 'src/app/building-blocks/input/input.component';
import { LabelComponent } from 'src/app/building-blocks/label/label.component';
import { CheckboxComponent } from 'src/app/building-blocks/checkbox/checkbox.component';
import { SelectComponent } from 'src/app/building-blocks/select/select.component';
import { TextareaComponent } from 'src/app/building-blocks/textarea/textarea.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'form-builder';

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store.dispatch(new LoginAction({ email: 'test@gmail.com', password: 'test' }));
    this.store.select(getComponents).subscribe(res => console.log(res));
  }
}

