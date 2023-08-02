import { TestBed } from '@angular/core/testing';

import { AnuncioService } from './anuncio.service';

describe('AnuncioService', () => {
  let service: AnuncioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnuncioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
