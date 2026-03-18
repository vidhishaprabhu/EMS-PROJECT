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
  private router = inject(Router);
  user: any;
  setUser:any;
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(1), Validators.max(6)]],
  });
  ngOnInit() {
    this.user = this.authService.getUser();
  }
  login() {
    this.authService
      .login(this.loginForm.value.email!, this.loginForm.value.password!)
      .subscribe((res: any) => {
        if (res) {
          alert(res.message);
          const token = localStorage.setItem('token', res.token);
          console.log(res.user);
          const user = localStorage.setItem('user', JSON.stringify(res.user));
          if(res.user.role==='admin'){
            this.router.navigateByUrl('/admin/dashboard')
          }
          else{
            this.router.navigateByUrl('/employee/dashboard')
          }
        } else {
          console.error('There is some error');
        }
      });
  }
}
