import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor() {}
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router=inject(Router)
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(1), Validators.max(6)]],
  });
  login() {
    this.authService
      .loginEmployee(
        this.loginForm.value.email!,
        this.loginForm.value.password!,
      )
      .subscribe((res: any) => {
        if (res) {
          alert(res.message);
          const token=localStorage.setItem('token',res.token)
          this.router.navigateByUrl('/admin/dashboard')
        } else {
          console.error('There is some error');
        }
      });
  }
}
