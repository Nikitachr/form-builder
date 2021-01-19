import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { ActionTypes } from '../actions/actions';
import { EComponentType } from '../../shared/enums/componentType.enum';
import { GeneralStyles } from '../../shared/models/general-styles.model';
import { UIComponent } from 'src/app/shared/models/component.model';
import {ESection} from '../../shared/enums/section.enum';


export interface ComponentState {
  components: UIComponent[];
  selectedComponent: number | null;
  section: ESection | null;
  generalStyles: GeneralStyles;
}

const initialState: ComponentState = {
  components: [],
  selectedComponent: null,
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
        ...state, components: [...state.components, action.payload], selectedComponent: action.payload.id
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
    case ActionTypes.DeleteComponent:
      return {
        ...state, components: state.components.filter(el => el.id !== action.payload)
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

export const getComponentByType = (type: EComponentType) => createSelector(getComponents, (allItems) => {
  if (allItems) {
    return allItems.filter(item => item.componentType === type);
  } else {
    return {};
  }
});

export const getGeneralStyles = (state: AppState) => state.componentsState.generalStyles;
export const getSelectedComponent = (state: AppState) => state.componentsState.selectedComponent;
export const getSection = (state: AppState) => state.componentsState.section;

export const metaReducers: MetaReducer<any, any>[] = !environment.production ? [] : [];
