import { Routes } from '@angular/router';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { EmployeeDashboardComponent } from './components/employee/employee-dashboard/employee-dashboard.component';
import { EmployeesComponent } from './components/admin/employees/employees.component';

export const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'

  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'admin',
        children: [
          { path: 'dashboard', component: DashboardComponent },
          
        ],

      },
      {
        path: 'admin',
        children: [
          { path: 'get-all-employee', component: EmployeesComponent },
          
        ],

      },
      {
        path: 'employee',
        children: [
          { path: 'dashboard', component: EmployeeDashboardComponent},
          
        ]
      },

     

    ]
  },

];
