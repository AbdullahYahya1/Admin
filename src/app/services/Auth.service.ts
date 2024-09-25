import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  refreshToken(): Observable<boolean> {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken || !refreshToken) {
      return of(false);
    }
    const refreshUrl = `${environment.apiUrl}Authentication/RefreshToken`;
    return this.http.post<any>(refreshUrl, { accessToken, refreshToken }).pipe(
      map((res: any) => {
        if (res.isSuccess) {
          localStorage.setItem('accessToken', res.result.accessToken);
          localStorage.setItem('refreshToken', res.result.refreshToken);
          const newExpirationTime = new Date().getTime() + (3000); 
          localStorage.setItem('tokenExpiration', newExpirationTime.toString());
          return true;
        }
        return false;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
}
