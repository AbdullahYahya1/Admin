import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/Auth.service';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const token = localStorage.getItem('accessToken');

  // If token is available, clone the request and attach the Authorization header
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq); // Forward the cloned request with the token attached
  }

  // If no token, proceed without modifying the request
  return next(req);
};
