import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { ActionTypes } from '../actions/actions';
import { ESection } from '../../shared/enums/section.enum';
import { EComponentType } from '../../shared/enums/componentType.enum';
import { GeneralStyles } from '../../shared/models/general-styles.model';
import { UIComponent } from 'src/app/shared/models/component.model';


export interface ComponentState {
  components: UIComponent[];
  dragComponent: EComponentType | null;
  selectedComponent: UIComponent | null;
  isDragging: boolean;
  section: ESection | null;
  generalStyles: GeneralStyles;
}

const initialState: ComponentState = {
  components: [],
  dragComponent: null,
  selectedComponent: null,
  isDragging: false,
  section: null,
  generalStyles: {
    margins: 10,
    paddingTop: 20,
    paddingLeft: 20,
    backgroundColor: '#fff'
  }
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
    case ActionTypes.UpdateComponent:
      const newArr = [...state.components];
      const index = state.components.findIndex(el => el.id === action.payload.id);
      newArr.splice(index, 1, action.payload);
      return {
        ...state, components: newArr
      };
    case ActionTypes.AddComponent:
      return  {
        ...state, components: [...state.components, action.payload], selectedComponent: action.payload
      };
    case ActionTypes.StartDragging:
      return {
        ...state, dragComponent: action.payload, isDragging: true
      };
    case ActionTypes.EndDragging:
      return {
        ...state, dragComponent: null, isDragging: false, section: null
      };
    case ActionTypes.ChangeSection:
      return {
        ...state, section: action.payload
      };
    case ActionTypes.UpdateGeneralStyles:
      return  {
        ...state, generalStyles: action.payload
      };
    case ActionTypes.SelectComponent:
      return  {
        ...state, selectedComponent: action.payload
      };
    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  componentsState: componentsReducer
};

export const getComponents = (state: AppState) => state.componentsState.components;
export const getComponentById = (id: number) => createSelector(getComponents, (allItems) => {
  if (allItems) {
    return allItems.find(item => {
      return item.id === id;
    });
  } else {
    return {};
  }
});
export const getIsDragging = (state: AppState) => state.componentsState.isDragging;
export const getSection = (state: AppState) => state.componentsState.section;
export const getGeneralStyles = (state: AppState) => state.componentsState.generalStyles;
export const getSelectedComponent = (state: AppState) => state.componentsState.selectedComponent;

export const metaReducers: MetaReducer<any, any>[] = !environment.production ? [] : [];
