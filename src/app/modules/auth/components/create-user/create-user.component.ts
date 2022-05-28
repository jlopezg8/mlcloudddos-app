import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {

  isSubmitting = false;
  createUserForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  onSubmit(): void {
    if (this.createUserForm.valid) {
      this.isSubmitting = true;
      const { email, password } = this.createUserForm.value;
      this.auth
          .createUser({ email, password })
          .subscribe({
            error: () => this.snackBar.open(
              'No se pudo crear el usuario. Ponte en contacto con Soporte.',
              'X',
              { duration: 3000 }
            ),
          })
          .add(() => this.isSubmitting = false);
    }
  }

}

