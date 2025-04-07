import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GraphqlService } from '../../services/graphql.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar'; // if using snackbar


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule, // optional, only if you’re using snackbar

  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private gqlService: GraphqlService
  ) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSignup() {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;
      
      this.gqlService.signup(username, email, password).subscribe({
        next: (res: any) => {
          const token = res.data.signup.token;  // Store the token if needed
          localStorage.setItem('token', token);
          this.router.navigate(['/login']);  // Navigate to login after successful signup
        },
        error: (err) => {
          console.error('Signup failed', err);
          alert('Signup failed. Check console.');
        }
      });
    }
  }
}
