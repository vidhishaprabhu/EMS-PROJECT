import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  userRole:string=''

  ngOnInit(){
    const token=localStorage.getItem('token')
    if(token){
      const decoded: any = JSON.parse(atob(token.split('.')[1])); 
      this.userRole = decoded.role; 
      console.log("Role",this.userRole);
      console.log('userRole:', this.userRole);
    }
  }

}
