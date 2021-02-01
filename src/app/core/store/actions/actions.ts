import { Action } from '@ngrx/store';

import { GeneralStyles } from 'src/app/shared/models/general-styles.model';
import { UIComponent } from 'src/app/shared/models/component.model';
import { User } from 'src/app/shared/models/user.model';

export enum ActionTypes {
  Login = '[Components] Login',
  LoginSuccess = '[Components] Login success',
  Registration = '[Components] Registration ',
  RegistrationSuccess = '[Components] Registration success',
  UpdateComponent = '[Components] Update component',
  AddComponent = '[Components] Add component',
  DeleteComponent = '[Components] Delete component',
  SelectComponent = '[Components] Select component',
  UpdateGeneralStyles = '[Component] Update general styles',
}

export class UpdateComponentAction implements Action {
  readonly type = ActionTypes.UpdateComponent;
  constructor(public payload: UIComponent) {
  }
}



export class AddComponentAction implements Action {
  readonly type = ActionTypes.AddComponent;
  constructor(public payload: UIComponent) {
  }
}

export class DeleteComponentAction implements Action {
  readonly type = ActionTypes.DeleteComponent;
  constructor(public payload: number) {
  }
}

export class SelectComponentAction implements Action {
  readonly type = ActionTypes.SelectComponent;
  constructor(public payload: number) {
  }
}

export class LoginAction implements Action {
  readonly type = ActionTypes.Login;
  constructor(public payload: User) {
  }
}

export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LoginSuccess;
  constructor(public payload: string) {
  }
}

export class RegistrationAction implements Action {
  readonly type = ActionTypes.Registration;
  constructor(public payload: User) {
  }
}

export class RegistrationSuccessAction implements Action {
  readonly type = ActionTypes.RegistrationSuccess;
  constructor(public payload: string) {
  }
}

export class UpdateGeneralStylesAction implements Action {
  readonly type = ActionTypes.UpdateGeneralStyles;
  constructor(public payload: GeneralStyles) {
  }
}

export type Actions =
  | LoginAction
  | LoginSuccessAction
  | RegistrationAction
  | RegistrationSuccessAction
  | UpdateComponentAction
  | DeleteComponentAction
  | SelectComponentAction
  | UpdateGeneralStylesAction
  | AddComponentAction;
