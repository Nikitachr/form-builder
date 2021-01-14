import {Component, Input, OnInit} from '@angular/core';
import {ComponentStyles} from '../../models/component-styles';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() styles: ComponentStyles = {
    placeholder: 'Input',
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
