import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { RefreshTokenRequest } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  refreshToken(): Observable<boolean> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
      console.error('Missing tokens in localStorage.');
      return of(false);
    }
    const refreshUrl = `${environment.apiUrl}Authentication/RefreshToken`;
    const payload: RefreshTokenRequest = {
      accessToken,
      refreshToken
    };
    return this.http
      .post<any>(refreshUrl, payload)
      .pipe(
        map((res: any) => {
          if (res.isSuccess) {
            localStorage.setItem('accessToken', res.result.accessToken);
            localStorage.setItem('refreshToken', res.result.refreshToken);
            const newExpirationTime = new Date().getTime() + 3000;
            localStorage.setItem('tokenExpiration', newExpirationTime.toString());
            return true;
          }
          console.error('Token refresh failed. Backend returned unsuccessful response.');
          return false;
        }),
        catchError((error) => {
          console.error('Error during token refresh:', error);
          return of(false);
        })
      );
  }
}
