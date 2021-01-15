import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../../environments/environment';
import {ComponentStyles} from '../../shared/models/component-styles';
import {Actions, ActionTypes} from '../actions/actions';
import {ESection} from '../../shared/enums/section.enum';
import {EComponentType} from '../../shared/enums/componentType.enum';


export interface ComponentState {
  components: ComponentStyles[] | [];
  dragComponent: EComponentType | null;
  isDragging: boolean;
  section: ESection | null;
}

const initialState: ComponentState = {
  components: [],
  dragComponent: null,
  isDragging: false,
  section: null,
};

export interface AppState {
  componentsState: ComponentState;
}

export function componentsReducer(state: ComponentState = initialState, action: any): ComponentState {
  switch (action.type) {
    case ActionTypes.LoadComponents:
      return {
        ...state, components: action.payload
      };
    case ActionTypes.UpdateComponents:
      return {
        ...state, components: action.payload
      };
    case ActionTypes.StartDragging:
      return {
        ...state, dragComponent: action.payload, isDragging: true
      };
    case ActionTypes.EndDragging:
      return {
        ...state, dragComponent: null, isDragging: false, section: null
      };
    case  ActionTypes.ChangeSection:
      return {
        ...state, section: action.payload
      };
    default:
      return state;
  }
}


export const reducers: ActionReducerMap<AppState> = {
  componentsState: componentsReducer
};

export const getComponents = (state: AppState) => state.componentsState.components;
export const getIsDragging = (state: AppState) => state.componentsState.isDragging;
export const getSection = (state: AppState) => state.componentsState.section;
export const getDragComponent = (state: AppState) => state.componentsState.dragComponent;

export const metaReducers: MetaReducer<any, any>[] = !environment.production ? [] : [];
