import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterPayload } from '../../core/model/common.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form: FormGroup;
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmit() {
    if (this.form.valid) {
      // Transformar los datos del formulario a un RegisterPayload
      const registerPayload: RegisterPayload = {
        email: this.form.get('email')!.value,
        password: this.form.get('password')!.value,
        firstname: this.form.get('firstname')!.value,
        lastname: this.form.get('lastname')!.value
      };

      this.authService.register(registerPayload).subscribe({
        next: () => {
          this.router.navigate(['login']);
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors;
        }
      })
    }
  }

}
