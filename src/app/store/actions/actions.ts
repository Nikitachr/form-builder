import { Action } from '@ngrx/store';

import { ComponentStyles } from '../../shared/models/component-styles';
import { ESection } from '../../shared/enums/section.enum';
import { EComponentType } from '../../shared/enums/componentType.enum';
import { GeneralStyles } from '../../shared/models/general-styles.model';
import { UIComponent } from 'src/app/shared/models/component.model';

export enum ActionTypes {
  LoadComponents = '[Components] Load components',
  UpdateComponent = '[Components] Update component',
  AddComponent = '[Components] Add component',
  SelectComponent = '[Components] Select component',
  StartDragging = '[Components] Start drag',
  EndDragging = '[Components] End drag',
  ChangeSection = '[Components] Change section',
  UpdateGeneralStyles = '[Component] Update general styles'
}

export class LoadComponents implements Action {
  readonly type = ActionTypes.LoadComponents;
  constructor(public payload: ComponentStyles[]) {
  }
}

export class UpdateComponent implements Action {
  readonly type = ActionTypes.UpdateComponent;
  constructor(public payload: UIComponent) {
  }

}

export class AddComponent implements Action {
  readonly type = ActionTypes.AddComponent;
  constructor(public payload: UIComponent) {
  }
}

export class SelectComponentAction implements Action {
  readonly type = ActionTypes.SelectComponent;
  constructor(public payload: UIComponent) {
  }
}

export class StartDragging implements Action {
  readonly type = ActionTypes.StartDragging;
  constructor(public payload: EComponentType) {
  }
}

export class EndDragging implements Action {
  readonly type = ActionTypes.EndDragging;
}

export class ChangeSection implements Action {
  readonly type = ActionTypes.ChangeSection;
  constructor(public payload: ESection) {
  }
}

export class UpdateGeneralStyles implements Action {
  readonly type = ActionTypes.UpdateGeneralStyles;
  constructor(public payload: GeneralStyles) {
  }
}

export type Actions =
  | LoadComponents
  | UpdateComponent
  | StartDragging
  | SelectComponentAction
  | EndDragging
  | ChangeSection
  | UpdateGeneralStyles
  | AddComponent;
