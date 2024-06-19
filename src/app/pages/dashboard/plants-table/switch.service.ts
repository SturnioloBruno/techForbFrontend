import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {

  constructor() { }

  $modalCreate = new EventEmitter<any>();
  $modalEdit = new EventEmitter<any>();
  $modalDelete = new EventEmitter<any>();
}
