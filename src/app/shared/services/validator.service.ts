import { Injectable } from '@angular/core';
import {AbstractControl, ValidatorFn} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  private numberPattern = /^-?(0|[1-9]\d*)?$/;
  private colorPattern = /^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/;

  constructor() { }

  public numberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const result = new RegExp(this.numberPattern).test(control.value);
      return result ? null : { numberInvalid: true };
    };
  }

  public colorValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const result = new RegExp(this.colorPattern).test(control.value);
      return result ? null : { colorInvalid: true };
    };
  }

}
