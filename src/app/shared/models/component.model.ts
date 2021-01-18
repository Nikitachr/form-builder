import { EComponentType } from '../enums/componentType.enum';
import { ComponentStyles } from './component-styles';
import { FormGroup } from '@angular/forms';

export interface UIComponent {
    id: number;
    name: string;
    componentType: EComponentType;
    styles: ComponentStyles;
    editForm: FormGroup;
}
