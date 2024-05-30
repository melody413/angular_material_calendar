import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateChangeHandlerService {
  public selectedDate$ = new BehaviorSubject<Date | null>(null);
  public eventCreated$ = new BehaviorSubject<unknown>(null);
  public deleteElement$ = new BehaviorSubject<number | null>(null);

  constructor() {}
}
