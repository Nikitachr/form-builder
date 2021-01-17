import { Component, Input, OnInit } from '@angular/core';

import { ComponentStyles } from '../../models/component-styles';
import {Store} from '@ngrx/store';
import {AppState, getComponentById} from '../../../store/reducers';
import {AddComponent} from '../../../store/actions/actions';
import { IdService } from '../../services/id.service';
import { EComponentType } from '../../enums/componentType.enum';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  styles$: Observable<ComponentStyles>;
  styles: ComponentStyles = {
    placeholder: 'Checkbox',
    width: 15,
    height: 15,
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
  
  ComponentType = EComponentType.Checkbox;
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
    this.styles$ = this.store.select(getComponentById(this.id)).pipe(map((component: any) => component.styles));
    this.styles$.subscribe(styles => this.styles = styles);
  }

}
