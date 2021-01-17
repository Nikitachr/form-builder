import {AfterViewInit, Component, ComponentRef, InjectionToken, OnInit} from '@angular/core';
import {AppState, ComponentState, getDragComponent, getGeneralStyles, getIsDragging, getSection} from '../store/reducers';
import {Store} from '@ngrx/store';
import {Observable, of, merge, fromEvent, Subject} from 'rxjs';
import {filter, map, scan, startWith} from 'rxjs/operators';
import {ComponentStyles} from '../shared/models/component-styles';
import {AddComponent, ChangeSection, UpdateComponents} from '../store/actions/actions';
import {ESection} from '../shared/enums/section.enum';
import { CdkPortalOutletAttachedRef, ComponentPortal} from '@angular/cdk/portal';
import { ButtonComponent } from '../shared/components/button/button.component';
import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
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

  foo(ref: CdkPortalOutletAttachedRef) {
    ref = ref as ComponentRef<any>;
    ref.instance.isTemplate = false;
  }


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.generalStyles$ = this.store.select(getGeneralStyles);
  }

  ngAfterViewInit(): void {
  }

  addComponent(component: any): void {
    this.componentPortal.push(new ComponentPortal(component));
  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.container.id === event.previousContainer.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
