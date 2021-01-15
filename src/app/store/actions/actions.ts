import { Action } from '@ngrx/store';
import { ComponentStyles } from '../../shared/models/component-styles';
import { ESection } from '../../shared/enums/section.enum';
import {EComponentType} from '../../shared/enums/componentType.enum';
import {GeneralStyles} from '../../shared/models/general-styles.model';

export enum ActionTypes {
  LoadComponents = '[Components] Load components',
  UpdateComponents = '[Components] Update components',
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

export class UpdateComponents implements Action {
  readonly type = ActionTypes.UpdateComponents;
  constructor(public payload: ComponentStyles[]) {
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
  | UpdateComponents
  | StartDragging
  | EndDragging
  | ChangeSection
  | UpdateGeneralStyles;
