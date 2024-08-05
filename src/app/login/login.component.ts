// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule, NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  providers:[AuthService , Router],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  cookiesAccepted: boolean;
  alert: { type: string, message: string } | null = null;
  fadeOut: boolean = false;
  fadeIn: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService , private router: Router) {
    this.cookiesAccepted = !!localStorage.getItem('cookiesAccepted');
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        response => {
          if (response.isEmailVerified) {
            this.alert = { type: 'warning', message: 'Por favor, verifica tu correo electrónico antes de ingresar.' };
          } else {
            if (response.message === "Login exitoso" && response.role === "admin") {
              this.router.navigate(["home"]);
            } else {
              this.router.navigate(["user-home"]);
            }
          }
        },
        error => {
          console.error('Error logging in', error);
        }
      );
    }
  }


  acceptCookies(): void {
    this.fadeOut = true;
    this.fadeIn = true;
    setTimeout(() => {
      localStorage.setItem('cookiesAccepted', 'true');
      this.cookiesAccepted = true;
    }, 500);
  }

  declineCookies(): void {
    this.cookiesAccepted = false;
    alert('Debe aceptar el uso de cookies para continuar.');
  }
  closeAlert(): void {
    this.alert = null;
  }

  // Método para redirigir al componente de recuperación de contraseña
  navigateToResetPassword(): void {
    this.router.navigate(['/password-req']);
  }

  navigateToRegister(){
    this.router.navigate(['register']);
  }
}
