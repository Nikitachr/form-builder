import { ActionReducerMap, createSelector, MetaReducer } from '@ngrx/store';

import { environment } from 'src/environments/environment';
import { Actions, ActionTypes } from 'src/app/core/store/actions/actions';
import { EComponentType } from 'src/app/shared/enums/component-type.enum';
import { GeneralStyles } from 'src/app/shared/models/general-styles.model';
import { UIComponent } from 'src/app/shared/models/component.model';
import {
  buttonStyles,
  checkboxStyles,
  inputStyles,
  labelStyles,
  selectStyles,
  textareaStyles
} from 'src/app/shared/mock-data/default-styles';
import { ButtonComponent } from 'src/app/building-blocks/button/button.component';
import { InputComponent } from 'src/app/building-blocks/input/input.component';
import { LabelComponent } from 'src/app/building-blocks/label/label.component';
import { CheckboxComponent } from 'src/app/building-blocks/checkbox/checkbox.component';
import { SelectComponent } from 'src/app/building-blocks/select/select.component';
import { TextareaComponent } from 'src/app/building-blocks/textarea/textarea.component';
import { ComponentStylesModel } from 'src/app/shared/models/component-styles.model';

export interface ComponentState {
  components: UIComponent[];
  viewportComponents: UIComponent[];
  selectedComponent: number | null;
  generalStyles: GeneralStyles;
}

const initialState: ComponentState = {
  components: [
    {
      id: 0,
      name: 'Button',
      componentType: EComponentType.Button,
      styles: { ...buttonStyles } as ComponentStylesModel,
      component: { ...ButtonComponent }
    },
    {
      id: 1,
      name: 'Input',
      componentType: EComponentType.Input,
      styles: { ...inputStyles } as ComponentStylesModel,
      component: { ...InputComponent }
    },
    {
      id: 2,
      name: 'Label',
      componentType: EComponentType.Label,
      styles: { ...labelStyles } as ComponentStylesModel,
      component: { ...LabelComponent }
    },
    {
      id: 3,
      name: 'Checkbox',
      componentType: EComponentType.Checkbox,
      styles: { ...checkboxStyles } as ComponentStylesModel,
      component: { ...CheckboxComponent }
    },
    {
      id: 4,
      name: 'Select',
      componentType: EComponentType.Select,
      styles: { ...selectStyles } as ComponentStylesModel,
      component: { ...SelectComponent }
    },
    {
      id: 5,
      name: 'Textarea',
      componentType: EComponentType.Textarea,
      styles: { ...textareaStyles } as ComponentStylesModel,
      component: { ...TextareaComponent }
    }
  ],
  viewportComponents: [],
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
      const newArr = [...state.viewportComponents];
      const index = state.viewportComponents.findIndex(el => el.id === action.payload.id);
      newArr.splice(index, 1, action.payload);
      return {
        ...state, viewportComponents: newArr
      };
    case ActionTypes.AddComponent:
      return  {
        ...state, viewportComponents: [...state.viewportComponents, action.payload], selectedComponent: action.payload.id
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
        ...state, viewportComponents: state.viewportComponents.filter(el => el.id !== action.payload)
      };
    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  componentsState: componentsReducer
};

export const getViewportComponents = (state: AppState) => state.componentsState.viewportComponents;
export const getComponents = (state: AppState) => state.componentsState.components;
export const getGeneralStyles = (state: AppState) => state.componentsState.generalStyles;
export const getSelectedComponent = (state: AppState) => state.componentsState.selectedComponent;

export const metaReducers: MetaReducer<any, any>[] = !environment.production ? [] : [];
