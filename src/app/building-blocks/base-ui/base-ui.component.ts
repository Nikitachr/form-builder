import {ChangeDetectorRef, Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {delay, first, map, takeUntil, tap} from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ComponentStyles } from 'src/app/shared/models/component-styles';
import { AddComponent, DeleteComponent, SelectComponentAction } from 'src/app/store/actions/actions';
import { ComponentService } from 'src/app/shared/services/component.service';
import { AppState, getComponentById } from 'src/app/store/reducers';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { EComponentType } from 'src/app/shared/enums/componentType.enum';
import { UIComponent } from 'src/app/shared/models/component.model';

@Component({
  template: ''
})

export abstract class BaseUiComponent implements OnInit, OnDestroy {

  public destroyed$: Subject<void> = new Subject();

  public styles$: Observable<ComponentStyles>;
  public styles: ComponentStyles;
  @Input() isTemplate;
  @Input() index;
  public ComponentType: EComponentType;
  public name: string;
  public editForm: FormGroup;

  @HostListener('click', ['$event'])
  onClick(): void {
    if (this.isTemplate) {
      return;
    }
    this.store.dispatch(new SelectComponentAction(this.index));
  }

  constructor(public idService: ComponentService, public store: Store<AppState>, public validatorService: ValidatorService, public cd: ChangeDetectorRef) { }

  abstract initForm(): void;

  ngOnInit(): void {
    this.initForm();
    this.componentInit();
  }

  componentInit(): void {
    if (this.isTemplate) {
      return;
    }
    this.idService.getName(this.ComponentType).pipe(first()).subscribe(res => this.name = res);
    this.store.dispatch(new AddComponent({
      id: this.index,
      name: this.name,
      componentType: this.ComponentType,
      styles: this.styles,
      editForm: this.editForm
    }));
    this.styles$ = this.store.select(getComponentById(this.index)).pipe(
      takeUntil(this.destroyed$),
      map((component: UIComponent) => component.styles)
    );
    this.styles$.subscribe(styles => this.styles = styles);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    if (!this.isTemplate) {
      this.store.dispatch(new DeleteComponent(this.index));
    }
  }

}
