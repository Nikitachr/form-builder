/* tslint:disable */
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {first, map} from 'rxjs/operators';

import { AddComponent, SelectComponentAction } from 'src/app/store/actions/actions';
import { AppState, getComponentById } from 'src/app/store/reducers';
import { EComponentType } from '../../enums/componentType.enum';
import { ComponentStyles } from '../../models/component-styles';
import { ComponentService } from '../../services/component.service';



@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  styles$: Observable<ComponentStyles> | undefined;
  styles: ComponentStyles = {
    placeholder: 'Button',
    width: 70,
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

  @Input() isTemplate: boolean = false;

  @HostListener('click', ['$event'])
  onClick(): void {
    if (this.isTemplate) {
      return;
    }
    this.store.dispatch(new SelectComponentAction({ id: this.id, name: this.name, componentType: this.ComponentType, styles: this.styles }));
  }

  ComponentType = EComponentType.Button;
  id: number = 0;
  name: string = '';

  constructor(private idService: ComponentService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.componentInit();
  }

   componentInit(): void {
    if (this.isTemplate) {
      return;
    }
    this.id = this.idService.getId();
    this.idService.getName(this.ComponentType).pipe(first()).subscribe(res => this.name = res);
    this.store.dispatch(new AddComponent({ id: this.id, name: this.name, componentType: this.ComponentType, styles: this.styles }));
    this.styles$ = this.store.select(getComponentById(this.id)).pipe(map((component: any) => component.styles));
    this.styles$.subscribe(styles => this.styles = styles);
  }

}
