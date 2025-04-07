import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create a spy for the Router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
  });

  afterEach(() => {
    // Clear any token from localStorage after each test
    localStorage.removeItem('token');
  });

  it('should allow activation when token exists', () => {
    // Simulate a valid token
    localStorage.setItem('token', 'dummy-token');
    const canActivate = guard.canActivate();
    expect(canActivate).toBeTrue();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should block activation and navigate to /login when token does not exist', () => {
    // Ensure there is no token in localStorage
    localStorage.removeItem('token');
    const canActivate = guard.canActivate();
    expect(canActivate).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
