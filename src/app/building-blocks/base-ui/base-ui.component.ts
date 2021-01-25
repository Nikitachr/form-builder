import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { first, map, takeUntil, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ComponentStyles } from 'src/app/shared/models/component-styles';
import { AddComponent, DeleteComponent, SelectComponentAction } from 'src/app/store/actions/actions';
import { AppState, getComponentById, getComponentByType } from 'src/app/store/reducers';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { EComponentType } from 'src/app/shared/enums/componentType.enum';
import { UIComponent } from 'src/app/shared/models/component.model';

@Component({
  template: ''
})

export abstract class BaseUiComponent implements OnInit, OnDestroy {

  public destroyed$: Subject<void> = new Subject();

  public styles$: BehaviorSubject<ComponentStyles>;
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

  constructor(public store: Store<AppState>, public validatorService: ValidatorService) { }

  abstract initForm(): void;

  ngOnInit(): void {
    this.styles$ = new BehaviorSubject<ComponentStyles>(this.styles);
    this.initForm();

    if (!this.isTemplate) {
      this.componentInit();
    }
  }

  componentInit(): void {
    this.getName(this.ComponentType).pipe(
      first(),
      tap((res) => {
        this.store.dispatch(new AddComponent({
          id: this.index,
          name: res,
          componentType: this.ComponentType,
          styles: this.styles,
          editForm: this.editForm
        }));
      })
    ).subscribe();

    this.store.select(getComponentById(this.index)).pipe(
      takeUntil(this.destroyed$),
      map((component: UIComponent) => component.styles),
      tap(res => this.styles$.next(res))
    ).subscribe();
  }

  getName(type: EComponentType): Observable<string> {
    return this.store.select(getComponentByType(type)).pipe(
      first(),
      map((res: UIComponent[]) => res.length ? type + ' ' + res.length : type)
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
    if (!this.isTemplate) {
      this.store.dispatch(new DeleteComponent(this.index));
    }
  }

}
