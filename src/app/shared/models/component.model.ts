import { EComponentType } from 'src/app/shared/enums/component-type.enum';
import { ComponentStylesModel } from 'src/app/shared/models/component-styles.model';

export interface UIComponent {
  id: number;
  name: string;
  componentType: EComponentType;
  styles: ComponentStylesModel;
  component: any;
}
