import { Component, OnInit } from '@angular/core';
import { ComponentState, getComponents } from '../store/reducers';
import {Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {ComponentStyles} from '../shared/models/component-styles';


@Component({
  selector: 'app-viewport-section',
  templateUrl: './viewport-section.component.html',
  styleUrls: ['./viewport-section.component.scss']
})
export class ViewportSectionComponent implements OnInit {

  component$: Observable<ComponentStyles[]> = of([]);

  constructor(private store: Store<ComponentState>) { }

  ngOnInit(): void {
    //this.component$ = this.store.select(getComponents);
    //this.component$.subscribe(res => console.log(res));
  }

  move(event: any): void {
    console.log(event);
  }
}
