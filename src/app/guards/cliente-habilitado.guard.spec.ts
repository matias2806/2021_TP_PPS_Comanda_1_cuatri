import { TestBed } from '@angular/core/testing';

import { ClienteHabilitadoGuard } from './cliente-habilitado.guard';

describe('ClienteHabilitadoGuard', () => {
  let guard: ClienteHabilitadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ClienteHabilitadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
