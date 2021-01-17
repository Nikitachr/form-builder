import { Component, Input, OnInit } from '@angular/core';

import { ComponentStyles } from '../../models/component-styles';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/reducers';
import {AddComponent} from '../../../store/actions/actions';
import { IdService } from '../../services/id.service';
import { EComponentType } from '../../enums/componentType.enum';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {

  styles: ComponentStyles = {
    placeholder: 'Text area',
    width: 300,
    height: 100,
    required: true,
    fontSize: 18,
    fontWeight: 400,
    color: '#000',
    bgColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000'
  };

  @Input() isTemplate: boolean = false;
  ComponentType = EComponentType.Textarea;
  id: number | undefined;
  name: string | undefined

  constructor(private IdService: IdService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.componentInit();
  }

  componentInit() {
    if(this.isTemplate) {
      return;
    }
    this.id = this.IdService.getId();
    this.name = this.ComponentType;
    this.store.dispatch(new AddComponent({ id: this.id, name: this.name, componentType: this.ComponentType, styles: this.styles }));
  }

}
