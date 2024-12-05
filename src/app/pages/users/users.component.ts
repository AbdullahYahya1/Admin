import { Component } from '@angular/core';
import { Driver, NormalUser } from '../../interfaces/interfaces';
import { MasterService } from '../../services/master.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  drivers: Driver[] = [];
  normalUsers: NormalUser[] = [];
  errorMessage: string = '';

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.fetchDrivers();
    this.fetchNormalUsers();
  }

  fetchDrivers(): void {
    this.masterService.getDrivers().subscribe({
      next: (response) => {
        console.log('Drivers:', response);
        if (response.isSuccess) {
          this.drivers = response.result;
        } else {
          this.errorMessage = response.message || 'Failed to fetch drivers.';
        }
      },
      error: () => {
        this.errorMessage = 'Error fetching drivers.';
      }
    });
  }

  fetchNormalUsers(): void {
    this.masterService.getNormalUsers().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.normalUsers = response.result;
        } else {
          this.errorMessage = response.message || 'Failed to fetch normal users.';
        }
      },
      error: () => {
        this.errorMessage = 'Error fetching normal users.';
      }
    });
  }

  toggleActiveStatus(user: Driver | NormalUser): void {
    user.isActive = !user.isActive; 
    const status = user.isActive ? 'Active' : 'Inactive';
    this.masterService.toggleUserStatus(user.userId).subscribe({
      next: (response) => {
        if (!response.isSuccess) {
          user.isActive = !user.isActive;
          this.errorMessage = response.message || 'Failed to toggle user status.';
          this.drivers = this.drivers.map(d => d.userId === user.userId ? user as Driver : d);
          this.normalUsers = this.normalUsers.map(nu => nu.userId === user.userId ? user as NormalUser : nu);
        }
      },
      error: () => {
        user.isActive = !user.isActive;
        this.errorMessage = 'Error toggling user status.';
      }
    });
  }
  
}
