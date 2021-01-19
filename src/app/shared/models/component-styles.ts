import { EAlignType } from '../enums/align.enum';

export interface ComponentStyles {
  placeholder?: string;
  width?: number;
  height?: number;
  marginTop?: number;
  required?: boolean;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  bgColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  align?: EAlignType;
}
