import { EAlignType } from 'src/app/shared/enums/align.enum';

export interface ComponentStylesModel {
  placeholder?: string;
  width?: number;
  height?: number;
  paddingLeft?: number;
  paddingTop?: number;
  marginTop?: number;
  fontSize?: number;
  fontWeight?: number;
  Color?: string;
  bgColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  align?: EAlignType;
}
