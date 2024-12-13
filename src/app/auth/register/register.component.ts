import { JsonPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AppValidators } from '../../shared/validators/form.validator';
import {
  Gender,
  gendersLabel,
  RegisterCredentials,
  rolesLabel,
} from '../auth.model';
import { AuthService } from '../auth.service';
import { map, of } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  passwords = new FormGroup(
    {
      password: new FormControl('', { validators: [Validators.required] }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required],
      }),
    },
    { validators: [AppValidators.equalValues('password', 'confirmPassword')] }
  );
  form = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [AppValidators.usernameIsUnique(this.authService)],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    passwords: this.passwords,
    firstName: new FormControl('', { validators: [Validators.required] }),
    lastName: new FormControl('', { validators: [Validators.required] }),
    gender: new FormControl<Gender | ''>('', {
      validators: Validators.required,
    }),
    birthDate: new FormControl('', {
      validators: [Validators.required, AppValidators.dateIsInPast],
    }),
    role: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  genderDropdown = [...gendersLabel];
  roleDropdown = [...rolesLabel];

  onSubmit() {
    const credentials = {
      username: this.form.controls.username.value!,
      password: this.form.controls.passwords.controls.password.value!,
      email: this.form.controls.email.value!,
      role: this.form.controls.role.value!,
      firstName: this.form.controls.firstName.value!,
      lastName: this.form.controls.lastName.value!,
      birthDate: this.form.controls.birthDate.value!,
      gender: this.form.controls.gender.value!
    }

    this.authService
      .register(credentials)
      .subscribe({
        next: (user) => {
          console.log('berhasil register', user);
          this.router.navigate(['login']);
        },
        error: (err) => {
          console.log('gagal register user', err);
        },
      });
  }
}
