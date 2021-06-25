import { TestBed } from '@angular/core/testing';

import { AuthContGuard } from './auth-cont.guard';

describe('AuthContGuard', () => {
  let guard: AuthContGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthContGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
