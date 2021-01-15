import { Component, OnInit } from '@angular/core';
import { EComponentType } from '../shared/enums/componentType.enum';
import {Store} from '@ngrx/store';
import {ComponentState} from '../store/reducers';
import {EndDragging, StartDragging} from '../store/actions/actions';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-templates-section',
  templateUrl: './templates-section.component.html',
  styleUrls: ['./templates-section.component.scss']
})
export class TemplatesSectionComponent implements OnInit {

  ComponentType = EComponentType;

  constructor(private store: Store<ComponentState>) { }

  ngOnInit(): void {
  }

  dragStart(event: any, type: EComponentType): void {
    this.store.dispatch(new StartDragging(type));
  }

  dragEnd(event: any): void {
    this.store.dispatch(new EndDragging());
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    if (event.container.id === event.previousContainer.id) {
      console.log(true);
    } else {
      console.log(false);
    }
  }

}
