import { Routes } from '@angular/router';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { LoginComponent } from './components/auth/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { EmployeeDashboardComponent } from './components/employee/employee-dashboard/employee-dashboard.component';
import { EmployeesComponent } from './components/admin/employees/employees.component';
import { AddEmployeeComponent } from './components/admin/add-employee/add-employee.component';
import { ViewEmployeeComponent } from './components/admin/view-employee/view-employee.component';
import { ViewSalaryComponent } from './components/admin/view-salary/view-salary.component';
import { ViewLeaveComponent } from './components/admin/view-leave/view-leave.component';
import { DepartmentsComponent } from './components/admin/departments/departments.component';
import { AddDepartmentComponent } from './components/admin/add-department/add-department.component';
import { LeavesComponent } from './components/admin/leaves/leaves.component';
import { ViewLeaveDetailsComponent } from './components/admin/view-leave-details/view-leave-details.component';
import { SalariesComponent } from './components/admin/salaries/salaries.component';
import { ChangePasswordComponent } from './components/admin/change-password/change-password.component';
import { MyProfileComponent } from './components/employee/my-profile/my-profile.component';
import { MyLeaveComponent } from './components/employee/my-leave/my-leave.component';
import { AddMyleaveFormComponent } from './components/employee/add-myleave-form/add-myleave-form.component';
import { MySalaryComponent } from './components/employee/my-salary/my-salary.component';
import { ForgetPasswordComponent } from './components/auth/forget-password/forget-password.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
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
        children: [
          { path: 'view-employee/:id', component: ViewEmployeeComponent },
        ],
      },
      {
        path: 'admin',
        children: [
          { path: 'add-employee/:id', component: AddEmployeeComponent },
        ],
      },
      {
        path: 'admin',
        children: [{ path: 'view-salary/:id', component: ViewSalaryComponent }],
      },
      {
        path: 'admin',
        children: [{ path: 'view-leave/:id', component: ViewLeaveComponent }],
      },
      {
        path: 'admin',
        children: [
          {
            path: 'view-leave-details/:id',
            component: ViewLeaveDetailsComponent,
          },
        ],
      },
      {
        path: 'admin',
        children: [
          { path: 'get-all-department', component: DepartmentsComponent },
        ],
      },
      {
        path: 'admin',
        children: [
          { path: 'add-department', component: AddDepartmentComponent },
        ],
      },
      {
        path: 'admin',
        children: [{ path: 'get-all-leave', component: LeavesComponent }],
      },
      {
        path: 'admin',
        children: [{ path: 'add-salaries', component: SalariesComponent }],
      },
      {
        path: 'admin',
        children: [
          {
            path: 'change-password',
            component: ChangePasswordComponent,
            data: { role: 'admin' },
          },
        ],
      },

      {
        path: 'employee',
        children: [
          { path: 'employee-dashboard', component: EmployeeDashboardComponent },
        ],
      },
      {
        path: 'employee',
        children: [{ path: 'my-profile', component: MyProfileComponent }],
      },
      {
        path: 'employee',
        children: [{ path: 'my-leaves', component: MyLeaveComponent }],
      },
      {
        path: 'employee',
        children: [
          { path: 'add-my-leave-form', component: AddMyleaveFormComponent },
        ],
      },
      {
        path: 'employee',
        children: [{ path: 'get-my-salary', component: MySalaryComponent }],
      },
      {
        path: 'employee',
        children: [
          {
            path: 'change-password',
            component: ChangePasswordComponent,
            data: { role: 'employee' },
          },
        ],
      },
    ],
  },
];
