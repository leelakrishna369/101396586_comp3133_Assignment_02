import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GraphqlService } from '../../services/graphql.service';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule // <-- Add this here

  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private gqlService: GraphqlService,
    private snackBar: MatSnackBar // <-- Inject here

  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
  
      this.gqlService.login(username, password).subscribe({
        next: (res: any) => {
          const token = res.data.login.token;
          localStorage.setItem('token', token);
          this.snackBar.open('Login successful! 🎉', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success'],
          });
          this.router.navigate(['/employee-list']);
        },
        error: (err) => {
          console.error('Login failed', err);
          this.snackBar.open('Login failed. Please check credentials.', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error'],
          });
        }
      });
    }
  }
}
