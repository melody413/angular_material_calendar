import { TestBed } from '@angular/core/testing';

import { DateChangeHandlerService } from './date-change-handler.service';

describe('DateChangeHandlerService', () => {
  let service: DateChangeHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateChangeHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
