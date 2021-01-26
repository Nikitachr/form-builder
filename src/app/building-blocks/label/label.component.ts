import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AppState } from 'src/app/store/reducers';
import { EComponentType } from 'src/app/shared/enums/component-type.enum';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { BaseUiComponent } from 'src/app/building-blocks/base-ui/base-ui.component';
import { EAlignType } from 'src/app/shared/enums/align.enum';
import { ComponentService } from 'src/app/shared/services/component.service';
import { STYLES } from 'src/app/shared/tokens/styles.token';
import { ComponentStylesModel } from 'src/app/shared/models/component-styles.model';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LabelComponent implements OnInit, OnDestroy {

  constructor(public store: Store<AppState>, @Inject(STYLES) public styles: ComponentStylesModel) {

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

}
