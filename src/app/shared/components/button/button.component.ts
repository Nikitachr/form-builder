import {Component, Input, OnInit, Output} from '@angular/core';

import { ComponentStyles } from '../../models/component-styles';
import {EventEmitter} from 'events';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() styles: ComponentStyles = {
    placeholder: 'Button',
    width: 70,
    height: 36,
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
