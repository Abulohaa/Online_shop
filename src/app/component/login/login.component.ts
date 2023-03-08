import { Router } from '@angular/router';
import { AuthService } from './../../servieces/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
    });
  }

  login() {
    this.authService.googleAuth();
  }
  loginWithPassword() {
    if (!this.form.valid) return;

    const { email, password } = this.form.value;
    this.authService.loginWithPassword(email, password).pipe(

    ).subscribe(() => {
      this.router.navigate([""])
    });
  }
}
""
