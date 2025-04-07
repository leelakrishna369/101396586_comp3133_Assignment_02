import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraphqlService } from '../../../services/graphql.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule here

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  imports: [CommonModule, FormsModule  ],  // Ensure CommonModule is imported here
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employeeId: string = '';  // Default value of an empty string
  employeeDetails: any = null;
  loading: boolean = true;
  error: any = null;
  imageUrl: string = '';  // For manual input of image URL


  constructor(
    private activatedRoute: ActivatedRoute,
    private gqlService: GraphqlService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch the employee ID from the route parameter
    this.activatedRoute.params.subscribe(params => {
      this.employeeId = params['id'];
      this.getEmployeeDetails();
    });
  }

  getEmployeeDetails(): void {
    this.gqlService.searchEmployeeById(this.employeeId).subscribe({
      next: (res: any) => {
        this.employeeDetails = res.data.searchEmployeeById;
        this.loading = false;
      },
      error: (err) => {
        this.error = err;
        this.loading = false;
      }
    });
  }

  onGoBack(): void {
    this.router.navigate(['/employee-list']);
  }
}
