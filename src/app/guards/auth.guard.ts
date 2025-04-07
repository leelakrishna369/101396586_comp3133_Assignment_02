import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token');  // Check if token exists in localStorage
    if (token) {
      return true; // User is authenticated, allow access
    } else {
      this.router.navigate(['/login']);  // Redirect to login page if no token
      return false;
    }
  }
}
