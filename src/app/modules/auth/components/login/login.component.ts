import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InvalidCredentialsError } from 'src/app/errors/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isSubmitting = false;
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      const { email, password } = this.loginForm.value;
      this.auth
          .login({ email, password })
          .subscribe({
            error: err => {
              const errorMessage = err instanceof InvalidCredentialsError
                ? 'Correo o contraseña incorrectos'
                : 'No se pudo iniciar sesión. Ponte en contacto con Soporte.';
              this.snackBar.open(errorMessage, 'X', { duration: 3000 });
            },
          })
          .add(() => this.isSubmitting = false);
    }
  }

}
