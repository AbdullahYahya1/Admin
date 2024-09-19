import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment'; // Import centralized API URL

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginOBJ: any = {
    emailORUserName: "",
    password: ""
  };

  http = inject(HttpClient);
  router = inject(Router);
  error = "";

  onLogin() {
    const loginUrl = `${environment.apiUrl}Authentication/Login`;
  
    this.http.post(loginUrl, this.loginOBJ).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          const currentTime = new Date().getTime();
          const tokenExpirationTime = currentTime + (300000 ); 
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
