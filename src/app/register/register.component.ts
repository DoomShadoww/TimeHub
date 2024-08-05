// src/app/register/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  providers:[AuthService],
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{
  registerForm: FormGroup;
  passwordValidations = {
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasSpecialChar: false,
    noConsecutiveNumbers: false,
    noConsecutiveLetters: false
  };

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, this.passwordValidator.bind(this)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      this.authService.register(username, password).subscribe(
        response => {
          console.log('User registered successfully', response);
        },
        error => {
          console.error('Error registering user', error);
        }
      );
    }
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    this.passwordValidations.minLength = value.length >= 8;
    this.passwordValidations.hasUpperCase = /[A-Z]/.test(value);
    this.passwordValidations.hasLowerCase = /[a-z]/.test(value);
    this.passwordValidations.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    this.passwordValidations.noConsecutiveNumbers = !/(012|123|234|345|456|567|678|789|890)/.test(value);
    this.passwordValidations.noConsecutiveLetters = !/(abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz)/i.test(value);

    const valid = Object.values(this.passwordValidations).every(v => v === true);

    return !valid ? { passwordInvalid: true } : null;
  }
}
