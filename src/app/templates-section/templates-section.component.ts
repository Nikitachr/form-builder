import { Component, ComponentRef, InjectionToken, OnInit } from '@angular/core';
import { EComponentType } from '../shared/enums/componentType.enum';
import {Store} from '@ngrx/store';
import {ComponentState} from '../store/reducers';
import {EndDragging, StartDragging} from '../store/actions/actions';
import { CdkDragDrop, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ButtonComponent } from '../shared/components/button/button.component';
import { CheckboxComponent } from '../shared/components/checkbox/checkbox.component';
import { InputComponent } from '../shared/components/input/input.component';
import { SelectComponent } from '../shared/components/select/select.component';
import { TextareaComponent } from '../shared/components/textarea/textarea.component';
import { CdkPortalOutletAttachedRef, ComponentPortal, PortalInjector } from '@angular/cdk/portal';

@Component({
  selector: 'app-templates-section',
  templateUrl: './templates-section.component.html',
  styleUrls: ['./templates-section.component.scss']
})


export class TemplatesSectionComponent implements OnInit {

  foo(ref: CdkPortalOutletAttachedRef) {
    ref = ref as ComponentRef<any>;
    ref.instance.isTemplate = true;
  }

  ComponentType = EComponentType;
  templateComponents: ComponentPortal<any>[] = [
    new ComponentPortal(ButtonComponent),
    new ComponentPortal(CheckboxComponent),
    new ComponentPortal(InputComponent),
    new ComponentPortal(SelectComponent),
    new ComponentPortal(TextareaComponent) 
  ]

  constructor(private store: Store<ComponentState>) { }

  ngOnInit(): void {

  }

  

  dragEnd(event: any): void {
    this.store.dispatch(new EndDragging());
  }

  drop(event: CdkDragDrop<string[]>): void {
    console.log(event);
    if (event.container.id === event.previousContainer.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
