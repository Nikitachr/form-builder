import { Action } from '@ngrx/store';

import { ComponentStyles } from 'src/app/shared/models/component-styles';
import { GeneralStyles } from 'src/app/shared/models/general-styles.model';
import { UIComponent } from 'src/app/shared/models/component.model';
import { ESection } from 'src/app/shared/enums/section.enum';

export enum ActionTypes {
  LoadComponents = '[Components] Load components',
  UpdateComponent = '[Components] Update component',
  AddComponent = '[Components] Add component',
  DeleteComponent = '[Components] Delete component',
  SelectComponent = '[Components] Select component',
  UpdateGeneralStyles = '[Component] Update general styles',
  ChangeSection = '[Component] Change section'
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

export  class ChangeSection implements Action {
  readonly type = ActionTypes.ChangeSection;
  constructor(public payload: ESection) {
  }
}

export class AddComponent implements Action {
  readonly type = ActionTypes.AddComponent;
  constructor(public payload: UIComponent) {
  }
}

export class DeleteComponent implements Action {
  readonly type = ActionTypes.DeleteComponent;
  constructor(public payload: number) {
  }
}

export class SelectComponentAction implements Action {
  readonly type = ActionTypes.SelectComponent;
  constructor(public payload: number) {
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
  | ChangeSection
  | DeleteComponent
  | SelectComponentAction
  | UpdateGeneralStyles
  | AddComponent;
