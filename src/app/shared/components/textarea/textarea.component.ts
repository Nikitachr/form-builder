import { Component, HostListener, Input, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ComponentStyles } from '../../models/component-styles';
import { AppState, getComponentById } from '../../../store/reducers';
import { AddComponent, SelectComponentAction} from '../../../store/actions/actions';
import { IdService } from '../../services/id.service';
import { EComponentType } from '../../enums/componentType.enum';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit {
  styles$: Observable<ComponentStyles> | undefined;
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

  @Input() isTemplate: boolean | undefined;
  ComponentType = EComponentType.Textarea;
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
