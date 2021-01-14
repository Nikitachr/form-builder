import { Component, Input, OnInit } from '@angular/core';

import { ComponentStyles } from '../../models/component-styles';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  @Input() styles: ComponentStyles = {
    placeholder: 'Checkbox',
    width: 15,
    height: 15,
    required: true,
    fontSize: 18,
    fontWeight: 400,
    color: '#000',
    bgColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000'
  };

  constructor() { }

  ngOnInit(): void {
  }

}
