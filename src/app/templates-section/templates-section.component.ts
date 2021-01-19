import { Component, ComponentRef, InjectionToken, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkPortalOutletAttachedRef, ComponentPortal } from '@angular/cdk/portal';

import { EComponentType } from '../shared/enums/componentType.enum';
import { ComponentState } from '../store/reducers';
import { ButtonComponent } from '../shared/components/button/button.component';
import { CheckboxComponent } from '../shared/components/checkbox/checkbox.component';
import { InputComponent } from '../shared/components/input/input.component';
import { SelectComponent } from '../shared/components/select/select.component';
import { TextareaComponent } from '../shared/components/textarea/textarea.component';
import {LabelComponent} from '../shared/components/label/label.component';

@Component({
  selector: 'app-templates-section',
  templateUrl: './templates-section.component.html',
  styleUrls: ['./templates-section.component.scss']
})


export class TemplatesSectionComponent implements OnInit {

  ComponentType = EComponentType;
  templateComponents: any[] = [
    {
      id: null,
      component: new ComponentPortal(ButtonComponent)
    },
    {
      id: null,
      component: new ComponentPortal(CheckboxComponent)
    },
    {
      id: null,
      component: new ComponentPortal(InputComponent)
    },
    {
      id: null,
      component: new ComponentPortal(SelectComponent)
    },
    {
      id: null,
      component: new ComponentPortal(TextareaComponent)
    },
    {
      id: null,
      component: new ComponentPortal(LabelComponent)
    },
  ];

  foo(ref: CdkPortalOutletAttachedRef): void {
    ref = ref as ComponentRef<any>;
    ref.instance.isTemplate = true;
  }

  constructor(private store: Store<ComponentState>) { }

  ngOnInit(): void {

  }

  drop(event: CdkDragDrop<string[]>): void {
    if (event.container.id === event.previousContainer.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  noReturnPredicate(): boolean {
    return false;
  }

}
