import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LoginPayload } from '../../core/model/common.model';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, ErrorMessageComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;
  errorMessage!: string

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  onSubmit() {
    if (this.form.valid) {
      const loginPayload: LoginPayload = {
        email: this.form.get('email')!.value,
        password: this.form.get('password')!.value,
      };
      this.authService.login(loginPayload).subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: (err : string) => {
          this.errorMessage = err;
        }
      });
    }
  }

  toRegister() {
    this.router.navigate(['register']);
  }

}
