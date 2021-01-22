import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { Actions, ActionTypes } from 'src/app/store/actions/actions';
import { EComponentType } from 'src/app/shared/enums/componentType.enum';
import { GeneralStyles } from 'src/app/shared/models/general-styles.model';
import { UIComponent } from 'src/app/shared/models/component.model';

export interface ComponentState {
  components: UIComponent[];
  selectedComponent: number | null;
  generalStyles: GeneralStyles;
}

const initialState: ComponentState = {
  components: [],
  selectedComponent: null,
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

export function componentsReducer(state: ComponentState = initialState, action: Actions): ComponentState {
  switch (action.type) {
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

export const getComponentByType = (type: EComponentType) => createSelector(getComponents, (allItems): UIComponent[] | {} => {
  return  allItems ? allItems.filter(item => item.componentType === type) : {};
});

export const getGeneralStyles = (state: AppState) => state.componentsState.generalStyles;
export const getSelectedComponent = (state: AppState) => state.componentsState.selectedComponent;

export const metaReducers: MetaReducer<any, any>[] = !environment.production ? [] : [];
