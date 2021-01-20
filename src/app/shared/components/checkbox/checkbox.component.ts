import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable, ReplaySubject} from 'rxjs';
import {first, map, takeUntil} from 'rxjs/operators';

import {ComponentStyles} from '../../models/component-styles';
import {AppState, getComponentById} from '../../../store/reducers';
import {AddComponent, DeleteComponent, SelectComponentAction} from '../../../store/actions/actions';
import {ComponentService} from '../../services/component.service';
import {EComponentType} from '../../enums/componentType.enum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EAlignType} from '../../enums/align.enum';
import {ValidatorService} from '../../services/validator.service';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  styles$: Observable<ComponentStyles> | undefined;
  styles: ComponentStyles = {
    placeholder: 'Checkbox',
    width: 15,
    height: 15,
    marginTop: 5,
    required: true,
    fontSize: 18,
    fontWeight: 400,
    color: '#000',
    bgColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000',
    align: EAlignType.Left
  };
  @Input() isTemplate: boolean | undefined;

  ComponentType = EComponentType.Checkbox;
  id: number | undefined;
  name: string | undefined;
  editForm: FormGroup | undefined;

  @HostListener('click', ['$event'])
  onClick(): void {
    if (this.isTemplate) {
      return;
    }
    this.store.dispatch(new SelectComponentAction(this.id as number));
  }

  constructor(private idService: ComponentService, private store: Store<AppState>, private validatorService: ValidatorService) { }

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
    this.store.dispatch(new AddComponent({ id: this.id, name: this.name as string, componentType: this.ComponentType, styles: this.styles, editForm: this.editForm as FormGroup }));
    this.styles$ = this.store.select(getComponentById(this.id)).pipe(
      takeUntil(this.destroyed$),
      map((component: any) => component.styles));
    this.styles$.subscribe(styles => this.styles = styles);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.store.dispatch(new DeleteComponent(this.id as number));
  }

}
