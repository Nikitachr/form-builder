import { EAlignType } from 'src/app/shared/enums/align.enum';

export interface ComponentStyles {
  placeholder?: string;
  width?: number;
  height?: number;
  paddingLeft?: number;
  paddingTop?: number;
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
