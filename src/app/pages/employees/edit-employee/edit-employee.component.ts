import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { Router } from '@angular/router';  // Import Router for navigation
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],  // Add these modules here
})
export class EditEmployeeComponent implements OnInit {

  // Define a form group for the employee's data
  editEmployeeForm!: FormGroup;

  // Default values for the employee form (this should be populated with real data if available)
  first_name: string = ''; // or default value
  last_name: string = ''; // or default value
  email: string = ''; // or default value
  salary: number = 0; // or default value
  designation: string = ''; // or default value
  department: string = ''; // or default value

  constructor(private fb: FormBuilder, private router: Router) { }  // Inject Router

  ngOnInit(): void {
    // Initialize the form with validators
    this.editEmployeeForm = this.fb.group({
      first_name: [this.first_name, [Validators.required]],
      last_name: [this.last_name, [Validators.required]],
      email: [this.email, [Validators.required, Validators.email]],
      salary: [this.salary, [Validators.required, Validators.min(1)]],
      designation: [this.designation, [Validators.required]],
      department: [this.department, [Validators.required]]
    });
  }

  // onSubmit function to handle form submission
  onSubmit(): void {
    if (this.editEmployeeForm.valid) {
      console.log('Employee data submitted:', this.editEmployeeForm.value);
    } else {
      console.log('Form is not valid!');
    }
  }

  // Method to navigate back
  goBack(): void {
    this.router.navigate(['/employee-list']);  // Replace 'your-back-route' with the actual route you want to navigate to
  }
}
