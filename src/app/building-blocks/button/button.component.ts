import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { STYLES } from 'src/app/shared/tokens/styles.token';
import { ComponentStylesModel } from 'src/app/shared/models/component-styles.model';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ButtonComponent implements OnInit, OnDestroy {

  constructor(@Inject(STYLES) public styles: ComponentStylesModel) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

}
