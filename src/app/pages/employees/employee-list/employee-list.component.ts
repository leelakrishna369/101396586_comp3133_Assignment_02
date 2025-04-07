import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GraphqlService } from '../../../services/graphql.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatFormFieldModule,  // Add MatFormFieldModule here
    MatInputModule,      // Add MatInputModule here
    FormsModule  
  ],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];
  designationFilter: string = '';
  departmentFilter: string = '';

  constructor(
    private gqlService: GraphqlService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getEmployees(); // Get all employees on initialization
  }

  getEmployees(): void {
    if (this.designationFilter || this.departmentFilter) {
      this.gqlService
        .searchEmployeeByDesignationOrDepartment(
          this.designationFilter,
          this.departmentFilter
        )
        .subscribe((res: any) => {
          this.employees = res.data.searchEmployeeByDesignationOrDepartment;
        });
    } else {
      // If no search filters are applied, get all employees
      this.gqlService.getAllEmployees().subscribe((res: any) => {
        this.employees = res.data.getAllEmployees;
      });
    }
  }

  // Method to handle search form submission
  onSearch(): void {
    this.getEmployees(); // Perform the search based on current filters
  }

  addEmployee() {
    this.router.navigate(['/add-employee']);
  }

  editEmployee(employeeId: string) {
    this.router.navigate(['/edit-employee', employeeId]);
  }

  viewEmployee(employeeId: string): void {
    this.router.navigate(['/employee-detail', employeeId]);
  }

  deleteEmployee(id: string): void {
    const confirmation = confirm('Are you sure you want to delete this employee?');
    if (confirmation) {
      this.gqlService.deleteEmployee(id).subscribe({
        next: () => {
          this.getEmployees(); // Refresh the employee list
          this.snackBar.open('Employee deleted successfully!', 'Close', {
            duration: 3000,
            panelClass: ['snack-success']
          });
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
          this.snackBar.open('Failed to delete employee.', 'Close', {
            duration: 3000,
            panelClass: ['snack-error']
          });
        }
      });
    }
  }

  // Implement logout functionality
  logout() {
    // this.authService.logout(); // Assuming your AuthService has a logout method
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

}
