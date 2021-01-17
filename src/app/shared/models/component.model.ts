import { EComponentType } from "../enums/componentType.enum";
import { ComponentStyles } from "./component-styles";

export interface UIComponent {
    id: number;
    name: string;
    componentType: EComponentType;
    styles: ComponentStyles;
}