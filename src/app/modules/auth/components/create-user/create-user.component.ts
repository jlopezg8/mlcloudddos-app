import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserControllerService } from 'src/app/api/auth/services';

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
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private userController: UserControllerService,
  ) { }

  onSubmit(): void {
    if (this.createUserForm.valid) {
      this.isSubmitting = true;
      const { email, password } = this.createUserForm.value;
      this.userController
          .createUser({ body: { email, password } })
          .subscribe({
            next: () => this.displayMessage('Usuario creado'),
            error: () => this.displayMessage(
              'No se pudo crear el usuario. Ponte en contacto con Soporte.'
            ),
          })
          .add(() => this.isSubmitting = false);
    }
  }

  displayMessage(message: string) {
    this.snackBar.open(message, 'X', { duration: 3000 });
  }

  shouldDisplayErrorMessage(controlName: string) {
    const control = this.createUserForm.controls[controlName];
    return control.invalid && control.touched;
  }

  getErrorMessage(controlName: string) {
    const control = this.createUserForm.controls[controlName];
    if (control.hasError('required')) {
      return '*Requerido';
    }
    if (control.hasError('email')) {
      return 'Correo inválido';
    }
    if (control.hasError('minlength')) {
      const { requiredLength } = control.getError('minlength');
      return `Debe tener al menos ${requiredLength} caracteres`;
    }
    return '';
  }

}
