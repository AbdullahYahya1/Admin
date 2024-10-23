import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from '../services/Auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); 
  const router = inject(Router);
  
  const tokenExpiration = localStorage.getItem('tokenExpiration');
  const currentTime = new Date().getTime();
  if (tokenExpiration && currentTime < parseInt(tokenExpiration)) {
    return of(true); 
  } else {
    return authService.refreshToken().pipe(
      map((isSuccess) => {
        if (isSuccess) {
          return true; 
        } else {
          router.navigate(['/login']); 
          return false;
        }
      }),
      catchError(() => {
        console.log('Token expired. Redirecting to login page... 22');

        router.navigate(['/login']); 
        return of(false);
      })
    );
  }
};
