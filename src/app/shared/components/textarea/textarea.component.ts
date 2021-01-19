import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {first, map, takeUntil} from 'rxjs/operators';
import {Observable, ReplaySubject} from 'rxjs';
import { Store } from '@ngrx/store';

import { ComponentStyles } from '../../models/component-styles';
import { AppState, getComponentById } from '../../../store/reducers';
import {AddComponent, DeleteComponent, SelectComponentAction} from '../../../store/actions/actions';
import { ComponentService } from '../../services/component.service';
import { EComponentType } from '../../enums/componentType.enum';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  styles$: Observable<ComponentStyles> | undefined;
  styles: ComponentStyles = {
    placeholder: 'Text area',
    width: 300,
    height: 100,
    paddingTop: 10,
    paddingLeft: 10,
    marginTop: 5,
    required: true,
    fontSize: 18,
    fontWeight: 400,
    color: '#000',
    bgColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000'
  };

  @Input() isTemplate: boolean | undefined;
  ComponentType = EComponentType.Textarea;
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

  constructor(private idService: ComponentService, private store: Store<AppState>) { }

  initForm(): void {
    this.editForm = new FormGroup({
      placeholder: new FormControl('', [Validators.required]),
      width: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      height: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      paddingTop: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      paddingLeft: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      marginTop: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      required: new FormControl('', [Validators.required]),
      fontSize: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      fontWeight: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      color: new FormControl('', [Validators.required, Validators.pattern(/^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/)]),
      bgColor: new FormControl('', [Validators.required, Validators.pattern(/^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/)]),
      borderRadius: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      borderWidth: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      borderColor: new FormControl('', [Validators.required, Validators.pattern(/^#(([0-9a-fA-F]{2}){3}|([0-9a-fA-F]){3})$/)]),
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
