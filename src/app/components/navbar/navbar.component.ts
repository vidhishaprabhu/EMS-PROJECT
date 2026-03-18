import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AdminService } from '../../services/dashboard/admin.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  router = inject(Router);
  authService = inject(AuthService);
  user: any;
  ngOnInit() {
    this.user = this.authService.getUser();
    console.log("User ",this.user);
  }
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.authService.logout();
  }
}
