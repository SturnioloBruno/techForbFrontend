import { TestBed } from '@angular/core/testing';

import { BanderaService } from './bandera.service';

describe('BanderaService', () => {
  let service: BanderaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BanderaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
