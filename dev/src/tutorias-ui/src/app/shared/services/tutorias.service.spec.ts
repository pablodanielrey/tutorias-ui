import { TestBed } from '@angular/core/testing';

import { TutoriasService } from './tutorias.service';

describe('TutoriasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TutoriasService = TestBed.get(TutoriasService);
    expect(service).toBeTruthy();
  });
});
