import { EAlignType } from 'src/app/shared/enums/align.enum';
import { ComponentStylesModel } from 'src/app/shared/models/component-styles.model';

export const buttonStyles: ComponentStylesModel = {
  placeholder: 'Button',
  width: 70,
  height: 36,
  marginTop: 5,
  fontSize: 18,
  fontWeight: 400,
  Color: '#000',
  bgColor: '#fff',
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#000',
  align: EAlignType.Center
};

export const checkboxStyles: ComponentStylesModel = {
  placeholder: 'Checkbox',
  width: 15,
  height: 15,
  marginTop: 5,
  fontSize: 18,
  fontWeight: 400,
  Color: '#000',
  bgColor: '#fff',
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#000',
  align: EAlignType.Left
};

export const inputStyles: ComponentStylesModel = {
  width: 300,
  placeholder: 'Input',
  height: 36,
  paddingTop: 10,
  paddingLeft: 10,
  marginTop: 5,
  fontSize: 18,
  fontWeight: 400,
  Color: '#000',
  bgColor: '#fff',
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#000'
};

export const labelStyles: ComponentStylesModel = {
  placeholder: 'Label',
  marginTop: 5,
  fontSize: 18,
  fontWeight: 400,
  Color: '#000',
  align: EAlignType.Left
};

export const selectStyles: ComponentStylesModel = {
  placeholder: 'Select',
  width: 100,
  height: 36,
  marginTop: 5,
  fontSize: 18,
  fontWeight: 400,
  Color: '#000',
  bgColor: '#fff',
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#000',
  align: EAlignType.Center
};

export const textareaStyles: ComponentStylesModel = {
  placeholder: 'Text area',
  width: 300,
  height: 100,
  paddingTop: 10,
  paddingLeft: 10,
  marginTop: 5,
  fontSize: 18,
  fontWeight: 400,
  Color: '#000',
  bgColor: '#fff',
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#000'
};

