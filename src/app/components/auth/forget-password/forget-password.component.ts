import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  private fb = inject(FormBuilder);
  authService = inject(AuthService);
  showNewPassword: boolean = false;
  showConfirmPassword: boolean = false;
  role!: string;
  route = inject(ActivatedRoute);
  router = inject(Router);
  forgetPasswordForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    newPassword: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
  });

  ngOnInit() {
    this.role = this.route.snapshot.data['role'];
  }

  forgetPassword() {
    this.authService
      .forgetPassword(
        this.forgetPasswordForm.value.email!,
        this.forgetPasswordForm.value.newPassword!,
        this.forgetPasswordForm.value.confirmPassword!,
      )
      .subscribe({
        next: (res: any) => {
          alert(res.message);
          this.router.navigate(['/login']);
        },
        error: (err) => alert(err.error.message || 'Email not found'),
      });
  }
}
