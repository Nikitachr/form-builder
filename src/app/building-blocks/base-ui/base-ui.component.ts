import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, map, takeUntil, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ComponentStylesModel } from 'src/app/shared/models/component-styles.model';
import { AddComponent, DeleteComponent, SelectComponentAction } from 'src/app/store/actions/actions';
import { AppState } from 'src/app/store/reducers';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { EComponentType } from 'src/app/shared/enums/component-type.enum';
import { UIComponent } from 'src/app/shared/models/component.model';
import { ComponentService } from 'src/app/shared/services/component.service';

@Component({
  template: ''
})

export abstract class BaseUiComponent implements OnInit, OnDestroy {



  constructor() { }

  ngOnInit(): void {
  }

  componentInit(): void {
  }

  ngOnDestroy(): void {

  }

}
