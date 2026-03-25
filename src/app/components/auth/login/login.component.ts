import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor() {}
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  errorMessage: string = '';
  route = inject(ActivatedRoute);
  showPassword: boolean = false;
  user: any;
  setUser: any;
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [Validators.required, Validators.minLength(1)],
    ],
  });
  ngOnInit() {
    this.user = this.authService.getUser();
  }
  login() {
    this.authService
      .login(this.loginForm.value.email!, this.loginForm.value.password!)
      .subscribe({
        next: (res: any) => {
          if (res) {
            alert(res.message);
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));

            if (res.user.role === 'admin') {
              this.router.navigateByUrl('/admin/dashboard');
            } else {
              this.router.navigateByUrl('/employee/employee-dashboard');
            }
          }
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      });
  }
  goToForgetPassword() {
    this.router.navigate(['/forget-password']);
  }
}
