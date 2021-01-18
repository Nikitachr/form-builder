import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  id = 0;

constructor() { }

  getId(): number {
    return this.id++;
  }
}
