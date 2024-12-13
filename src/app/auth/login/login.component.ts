import { AfterContentInit, Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  router = inject(Router);
  _authService = inject(AuthService);

  form = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),
    password: new FormControl(''),
  });

  onSubmit() {
    if (this.form.invalid) {
      window.alert('ada data yang tidak valid');
      return;
    }

    this._authService
      .login({
        username: this.form.value.username!,
        password: this.form.value.password!,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: () => {
          window.alert('gagal login');
        },
      });
  }
}
