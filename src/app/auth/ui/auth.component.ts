import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge, Subscriber } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthRequest } from '../models/auth.requesy';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-auth',
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  auth = inject(AuthService);
  readonly username = new FormControl('', [Validators.required,]);
  readonly password = new FormControl('', [Validators.required,]);
  usernameErrorMessage = signal('');
  passwordErrorMessage = signal('');
  severMessage = signal('');
  busy = false;
  constructor() {
    merge(this.password.statusChanges, this.password.valueChanges, this.username.statusChanges, this.username.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordErrorMessage());
  }
  updatePasswordErrorMessage() {
    if (this.password.hasError('requierd')) {
      this.passwordErrorMessage.set('کلمه عبور وارد نشده');
    }
    else {
      this.passwordErrorMessage.set('');
    }
  }
  updateUsernameErrorMessage() {
    if (this.username.hasError('required')) {
      this.usernameErrorMessage.set('نام کاربری وارد نشده');
    }
    else {
      this.usernameErrorMessage.set('');
    }
  }
  check() {
    const loginDate: AuthRequest = {
      username: this.username.value ?? '',
      password: this.password.value ?? ''
    };
    this.severMessage.set('');
    this.busy = true;
    this.auth.login(loginDate).subscribe({
      next: (res) => {
        this.busy = false;
      },
      error: (err) => {
        this.severMessage.set('برقراری ارتباط به مشکل خورد');
      },

    });
    console.log('hehehehhe')

  }

}

