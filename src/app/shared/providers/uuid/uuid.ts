import { Injectable } from '@angular/core';
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class Uuid {
  constructor() { }

  public get(): string {
    return v4();
  }
}
