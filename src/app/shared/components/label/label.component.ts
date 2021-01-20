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
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  styles$: Observable<ComponentStyles> | undefined;
  styles: ComponentStyles = {
    placeholder: 'Label',
    marginTop: 5,
    fontSize: 18,
    fontWeight: 400,
    color: '#000',
    align: EAlignType.Left
  };

  @Input() isTemplate: boolean | undefined;
  ComponentType = EComponentType.Label;
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
      marginTop: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      fontSize: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      fontWeight: new FormControl('', [Validators.required, this.validatorService.numberValidator()]),
      color: new FormControl('', [Validators.required, this.validatorService.colorValidator()]),
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
