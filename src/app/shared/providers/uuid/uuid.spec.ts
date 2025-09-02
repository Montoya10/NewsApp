import { TestBed } from '@angular/core/testing';

import { Uuid } from './uuid';

describe('Uuid', () => {
  let service: Uuid;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Uuid);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
