import { Routes } from '@angular/router';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { EmployeeDashboardComponent } from './components/employee/employee-dashboard/employee-dashboard.component';
import { EmployeesComponent } from './components/admin/employees/employees.component';
import { AddEmployeeComponent } from './components/admin/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './components/admin/view-employee/view-employee.component';
import { ViewSalaryComponent } from './components/admin/view-salary/view-salary.component';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'admin',
        children: [{ path: 'dashboard', component: DashboardComponent }],
      },
      {
        path: 'admin',
        children: [{ path: 'get-all-employee', component: EmployeesComponent }],
      },
      {
        path: 'admin',
        children: [{ path: 'add-employee', component: AddEmployeeComponent }],
      },
      {
        path: 'admin',
        children: [{ path: 'view-employee', component: ViewEmployeeComponent }],
      },
      {
        path: 'admin',
        children: [{ path: 'view-employee/:id', component: ViewEmployeeComponent }],
      },
      {
        path: 'admin',
        children: [{ path: 'view-salary/:id', component: ViewSalaryComponent }],
      },
      {
        path: 'employee',
        children: [
          { path: 'dashboard', component: EmployeeDashboardComponent },
        ],
      },
    ],
  },
];
