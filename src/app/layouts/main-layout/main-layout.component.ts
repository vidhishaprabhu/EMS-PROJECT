import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet,SidebarComponent,NavbarComponent,CommonModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {
  router=inject(Router)
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    console.log('Token exists:', !!token); // Check this in console
    return !!token;
  }
  showSidebar(): boolean {
    return this.isLoggedIn() && !this.router.url.includes('/login');
  }

  showNavbar():boolean{
    return this.isLoggedIn() && !this.router.url.includes('/login')
  }
}
