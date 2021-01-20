/* tslint:disable */
import { Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, ReplaySubject} from 'rxjs';
import {first, map, takeUntil} from 'rxjs/operators';

import {AddComponent, DeleteComponent, SelectComponentAction} from 'src/app/store/actions/actions';
import {AppState, getComponentById} from 'src/app/store/reducers';
import {EComponentType} from '../../enums/componentType.enum';
import {ComponentStyles} from '../../models/component-styles';
import {ComponentService} from '../../services/component.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EAlignType} from '../../enums/align.enum';
import {ValidatorService} from '../../services/validator.service';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  styles$: Observable<ComponentStyles> | undefined;
  styles: ComponentStyles = {
    placeholder: 'Button',
    width: 70,
    height: 36,
    marginTop: 5,
    required: true,
    fontSize: 18,
    fontWeight: 400,
    color: '#000',
    bgColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    align: EAlignType.Center
  };

  @Input() isTemplate: boolean = false;
  ComponentType = EComponentType.Button;
  id: number = 0;
  name: string = '';
  editForm: FormGroup | undefined;

  @HostListener('click', ['$event'])
  onClick(): void {
    if (this.isTemplate) {
      return;
    }
    this.store.dispatch(new SelectComponentAction(this.id));
  }

  initForm(): void {
    this.editForm = new FormGroup({
      placeholder: new FormControl('', [Validators.required]),
      width: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      height: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      marginTop: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      required: new FormControl('', [Validators.required]),
      fontSize: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      fontWeight: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      color: new FormControl('', [Validators.required, this.validatorService.colorValidator()]),
      bgColor: new FormControl('', [Validators.required, this.validatorService.colorValidator()]),
      borderRadius: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      borderWidth: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      borderColor: new FormControl('', [Validators.required, this.validatorService.colorValidator()]),
      align: new FormControl('', [Validators.required])
    });
  }

  constructor(private idService: ComponentService, private store: Store<AppState>, private validatorService: ValidatorService) { }

  ngOnInit(): void {
    this.initForm();
    this.componentInit();
  }

   componentInit(): void {
    if (this.isTemplate) {
      return;
    }
    this.id = this.idService.getId();
    this.idService.getName(this.ComponentType).pipe(first()).subscribe(res => this.name = res);
    this.store.dispatch(new AddComponent({ id: this.id, name: this.name, componentType: this.ComponentType, styles: this.styles, editForm: this.editForm as FormGroup }));
    this.styles$ = this.store.select(getComponentById(this.id)).pipe(
      takeUntil(this.destroyed$),
      map((component: any) => component.styles));
    this.styles$.subscribe(styles => this.styles = styles);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.store.dispatch(new DeleteComponent(this.id));
  }


}
