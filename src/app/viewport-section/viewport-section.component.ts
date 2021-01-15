import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppState, ComponentState, getDragComponent, getIsDragging, getSection} from '../store/reducers';
import {Store} from '@ngrx/store';
import {Observable, of, merge, fromEvent, Subject} from 'rxjs';
import {filter, map, scan, startWith} from 'rxjs/operators';
import {ComponentStyles} from '../shared/models/component-styles';
import {ChangeSection} from '../store/actions/actions';
import {ESection} from '../shared/enums/section.enum';
import { ComponentPortal}  from '@angular/cdk/portal';
import { ButtonComponent } from '../shared/components/button/button.component';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import {switchMap, tap} from 'rxjs/operators';
import {EComponentType} from '../shared/enums/componentType.enum';
import {CheckboxComponent} from '../shared/components/checkbox/checkbox.component';
import {SelectComponent} from '../shared/components/select/select.component';
import {InputComponent} from '../shared/components/input/input.component';
import {TextareaComponent} from '../shared/components/textarea/textarea.component';


@Component({
  selector: 'app-viewport-section',
  templateUrl: './viewport-section.component.html',
  styleUrls: ['./viewport-section.component.scss']
})
export class ViewportSectionComponent implements OnInit, AfterViewInit {

  componentPortal: ComponentPortal<any>[] = [];
  state: Observable<any>;
  click: Observable<any>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  this.state = merge(
    this.store.select(getIsDragging).pipe(map(
      res => {
      return { isDrag: res };
    })),
    this.store.select(getDragComponent).pipe(map(
      res => {
        return { dragComponent: res };
      }
    )),
    this.store.select(getSection).pipe(map(
      res => {
        return { section: res };
      }
    ))
  ).pipe(
    scan((state: any, curr) => ({ ...state, ...curr }), {}),
    filter(state => state.isDrag && state.section === ESection.Viewport),
    tap(state => this.addComponent(state.dragComponent))
  ).subscribe();
  }

  ngAfterViewInit() {
  }

  addComponent(type: EComponentType) {
    switch (type) {
      case EComponentType.Button:
        return this.componentPortal.push(new ComponentPortal(ButtonComponent));
      case EComponentType.Checkbox:
        return this.componentPortal.push(new ComponentPortal(CheckboxComponent));
      case EComponentType.Select:
        return this.componentPortal.push(new ComponentPortal(SelectComponent));
      case EComponentType.Input:
        return this.componentPortal.push(new ComponentPortal(InputComponent));
      case EComponentType.Textarea:
        return this.componentPortal.push(new ComponentPortal(TextareaComponent));
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.container.id === event.previousContainer.id) {
      console.log(true);
    } else {
      console.log(false);
    }
  }
}
