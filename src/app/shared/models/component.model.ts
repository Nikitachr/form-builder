import { FormGroup } from '@angular/forms';

import { EComponentType } from 'src/app/shared/enums/component-type.enum';
import { ComponentStylesModel } from 'src/app/shared/models/component-styles.model';
import { BaseUiComponent } from 'src/app/building-blocks/base-ui/base-ui.component';
import { ButtonComponent } from 'src/app/building-blocks/button/button.component';

export interface UIComponent {
  id?: number;
  name: string;
  componentType: EComponentType;
  styles: ComponentStylesModel;
  component: any;
}
