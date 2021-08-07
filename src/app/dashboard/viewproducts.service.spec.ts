import { TestBed } from '@angular/core/testing';

import { ViewproductsService } from './viewproducts.service';

describe('ViewproductsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewproductsService = TestBed.get(ViewproductsService);
    expect(service).toBeTruthy();
  });
});
