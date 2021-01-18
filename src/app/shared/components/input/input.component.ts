import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ComponentStyles } from '../../models/component-styles';
import { AppState, getComponentById } from '../../../store/reducers';
import { AddComponent, SelectComponentAction } from '../../../store/actions/actions';
import { IdService } from '../../services/id.service';
import { EComponentType } from '../../enums/componentType.enum';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  styles$: Observable<ComponentStyles> | undefined;
  styles: ComponentStyles = {
    placeholder: 'Input',
    width: 240,
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

  @Input() isTemplate: boolean | undefined;
  ComponentType = EComponentType.Input;
  id: number | undefined;
  name: string | undefined;

  @HostListener('click', ['$event'])
  onClick(): void {
    if (this.isTemplate) {
      return;
    }
    this.store.dispatch(new SelectComponentAction({ id: this.id as number, name: this.name as string, componentType: this.ComponentType, styles: this.styles }));
  }

  constructor(private IdService: IdService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.componentInit();
  }

  componentInit(): void {
    if (this.isTemplate) {
      return;
    }
    this.id = this.IdService.getId();
    this.name = this.ComponentType;
    this.store.dispatch(new AddComponent({ id: this.id, name: this.name, componentType: this.ComponentType, styles: this.styles }));
    this.styles$ = this.store.select(getComponentById(this.id)).pipe(map((component: any) => component.styles));
    this.styles$.subscribe(styles => this.styles = styles);
  }

}
