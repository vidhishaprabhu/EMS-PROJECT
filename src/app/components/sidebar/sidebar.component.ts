import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  userRole: string = '';

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = JSON.parse(atob(token.split('.')[1]));
      console.log('Full decoded:', decoded); // Add this temporarily
console.log('Role:', decoded.role);    // Is 'role' the correct key?
      this.userRole = decoded.role.trim().toLowerCase();
      console.log('Role:', this.userRole);
    }
  }
}
