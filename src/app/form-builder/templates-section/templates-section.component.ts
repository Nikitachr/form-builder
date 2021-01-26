import { ChangeDetectionStrategy, Component, ComponentRef, InjectionToken, Injector } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CdkPortalOutletAttachedRef, ComponentPortal } from '@angular/cdk/portal';

import { EComponentType } from 'src/app/shared/enums/component-type.enum';
import { ButtonComponent } from 'src/app/building-blocks/button/button.component';
import { CheckboxComponent } from 'src/app/building-blocks/checkbox/checkbox.component';
import { InputComponent } from 'src/app/building-blocks/input/input.component';
import { SelectComponent } from 'src/app/building-blocks/select/select.component';
import { TextareaComponent } from 'src/app/building-blocks/textarea/textarea.component';
import { LabelComponent } from 'src/app/building-blocks/label/label.component';
import { ViewComponent } from 'src/app/shared/models/view-component.model';
import { BaseUiComponent } from 'src/app/building-blocks/base-ui/base-ui.component';
import { StylesInjector } from 'src/app/shared/tokens/styles.token';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { UIComponent } from 'src/app/shared/models/component.model';
import { AppState, getComponents } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { StylesTokenService } from 'src/app/shared/services/styles-token.service';

@Component({
  selector: 'app-templates-section',
  templateUrl: './templates-section.component.html',
  styleUrls: ['./templates-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TemplatesSectionComponent {

  templateComponents$ = this.store.select(getComponents);

  constructor(private validatorService: ValidatorService, private store: Store<AppState>, private stylesTokenService: StylesTokenService) {

  }

  getInjectorById(id: number): Observable<StylesInjector> {
    return this.stylesTokenService.getInjectorById(id);
  }

  drop(event: CdkDragDrop<any[]>): void {
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
