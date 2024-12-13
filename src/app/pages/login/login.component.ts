import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment'; // Import centralized API URL
import { AuthService } from '../../services/Auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService); 
  router = inject(Router);
  http = inject(HttpClient);

  ngOnInit(): void {
      this.refreshToken();
  }

  refreshToken(): void {

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (!accessToken || !refreshToken) {
      return;
    }

    const refreshUrl = `${environment.apiUrl}Authentication/RefreshToken`;
    const payload = { accessToken, refreshToken };

    this.http.post<any>(refreshUrl, payload).subscribe({
      next: (res: any) => {

        if (res.isSuccess) {
 
          localStorage.setItem('accessToken', res.result.accessToken);
          localStorage.setItem('refreshToken', res.result.refreshToken);
          const newExpirationTime = new Date().getTime() + 3000; 
          localStorage.setItem('tokenExpiration', newExpirationTime.toString());
          this.router.navigate(['/stats']);
        }else{
       console.log('Token refresh failed. Backend returned unsuccessful response.' , res);
        }
      },
      error: (err) => {
        console.log('Error refreshing token:', err);
      }
    });
  }

  loginOBJ: any = {
    emailORUserName: "",
    password: ""
  };

  error = "";

  

  onLogin() {
    const loginUrl = `${environment.apiUrl}Authentication/Login`;
  
    this.http.post(loginUrl, this.loginOBJ).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          console.log(res.result.user)
          if(res.result.user.userType != 1){
            this.error = "You are not an admin. Please login as an admin to continue.";
           return;
          }
          const tokenExpirationTime =  new Date().getTime() + 3000; 
          localStorage.setItem("accessToken", res.result.tokens.accessToken);
          localStorage.setItem("refreshToken", res.result.tokens.refreshToken);
          localStorage.setItem("tokenExpiration", tokenExpirationTime.toString());
          localStorage.setItem("user", JSON.stringify(res.result.user));
          this.router.navigateByUrl('/stats');
        } else {
          this.error = "Check your credentials.";
        }
      },
      error: (err) => {
        if (err.error && err.error.message) {
          this.error = `Login failed: ${err.error.message}`;
        } else {
          this.error = "Login failed. Please check your credentials.";
        }
      }
    });
  }
  
}
