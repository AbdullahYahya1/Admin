import { interval, Subscription } from 'rxjs';
import { MasterService } from './../../services/master.service';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/Auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  private subscription: Subscription | null = null; 

  constructor(private router: Router ) {}

  ngOnInit(): void {
    this.subscription = interval(300000).subscribe(() => {
      this.authService.refreshToken().subscribe({
        next: (newToken) => {
          console.log('Token refreshed successfully.');
        },
        error: (err) => {
          console.error('Error refreshing token:', err);
          // Optionally, handle errors, e.g., redirect to login if refresh fails
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiration');
    this.router.navigate(['/login']);
  }
}
