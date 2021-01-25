import { ChangeDetectionStrategy, Component, ComponentRef } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkPortalOutletAttachedRef, ComponentPortal } from '@angular/cdk/portal';

import { EComponentType } from 'src/app/shared/enums/componentType.enum';
import { ButtonComponent } from 'src/app/building-blocks/button/button.component';
import { CheckboxComponent } from 'src/app/building-blocks/checkbox/checkbox.component';
import { InputComponent } from 'src/app/building-blocks/input/input.component';
import { SelectComponent } from 'src/app/building-blocks/select/select.component';
import { TextareaComponent } from 'src/app/building-blocks/textarea/textarea.component';
import { LabelComponent } from 'src/app/building-blocks/label/label.component';
import { ViewComponent } from 'src/app/shared/models/viewComponent.model';
import { BaseUiComponent } from 'src/app/building-blocks/base-ui/base-ui.component';

@Component({
  selector: 'app-templates-section',
  templateUrl: './templates-section.component.html',
  styleUrls: ['./templates-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TemplatesSectionComponent {

  ComponentType = EComponentType;
  templateComponents: ViewComponent[] = [
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

  input(ref: CdkPortalOutletAttachedRef): void {
    ref = ref as ComponentRef<BaseUiComponent>;
    ref.instance.isTemplate = true;
  }

  constructor() { }

  drop(event: CdkDragDrop<ViewComponent[]>): void {
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
