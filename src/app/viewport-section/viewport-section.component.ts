import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppState, ComponentState, getDragComponent, getGeneralStyles, getIsDragging, getSection} from '../store/reducers';
import {Store} from '@ngrx/store';
import {Observable, of, merge, fromEvent, Subject} from 'rxjs';
import {filter, map, scan, startWith} from 'rxjs/operators';
import {ComponentStyles} from '../shared/models/component-styles';
import {AddComponent, ChangeSection, UpdateComponents} from '../store/actions/actions';
import {ESection} from '../shared/enums/section.enum';
import { ComponentPortal} from '@angular/cdk/portal';
import { ButtonComponent } from '../shared/components/button/button.component';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {switchMap, tap} from 'rxjs/operators';
import {EComponentType} from '../shared/enums/componentType.enum';
import {CheckboxComponent} from '../shared/components/checkbox/checkbox.component';
import {SelectComponent} from '../shared/components/select/select.component';
import {InputComponent} from '../shared/components/input/input.component';
import {TextareaComponent} from '../shared/components/textarea/textarea.component';
import {GeneralStyles} from '../shared/models/general-styles.model';


@Component({
  selector: 'app-viewport-section',
  templateUrl: './viewport-section.component.html',
  styleUrls: ['./viewport-section.component.scss']
})
export class ViewportSectionComponent implements OnInit, AfterViewInit {

  componentPortal: ComponentPortal<any>[] = [];
  generalStyles$: Observable<GeneralStyles> | undefined;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.generalStyles$ = this.store.select(getGeneralStyles);
  }

  ngAfterViewInit(): void {
    console.log(ButtonComponent);
  }

  addComponent(component: any): void {
    this.componentPortal.push(new ComponentPortal(component));
  }

  drop(event: CdkDragDrop<string[]>): void {
    console.log(event);
    if (event.container.id === event.previousContainer.id) {
      console.log(true);
    } else {
      switch (event.previousContainer.id) {
        case 'list-1':
          return this.addComponent(ButtonComponent);
        case 'list-2':
          return this.addComponent(InputComponent);
        case 'list-3':
          return this.addComponent(CheckboxComponent);
        case 'list-4':
          return this.addComponent(TextareaComponent);
        case 'list-5':
          return this.addComponent(SelectComponent);
      }
    }
  }
}
