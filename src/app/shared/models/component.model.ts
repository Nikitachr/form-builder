import { FormGroup } from '@angular/forms';

import { EComponentType } from 'src/app/shared/enums/componentType.enum';
import { ComponentStyles } from 'src/app/shared/models/component-styles';

export interface UIComponent {
  id: number;
  name: string;
  componentType: EComponentType;
  styles: ComponentStyles;
  editForm: FormGroup;
}
