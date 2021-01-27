import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { STYLES } from 'src/app/shared/tokens/styles.token';
import { ComponentStylesModel } from 'src/app/shared/models/component-styles.model';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent {

  constructor(@Inject(STYLES) public styles: ComponentStylesModel) {
  }

}
