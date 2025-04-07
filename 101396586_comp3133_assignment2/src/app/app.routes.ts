import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './guards/auth.guard'; // Import the auth guard
import { EmployeeListComponent } from './pages/employees/employee-list/employee-list.component';
import { EmployeeDetailComponent } from './pages/employees/employee-detail/employee-detail.component';
import { AddEmployeeComponent } from './pages/employees/add-employee/add-employee.component';
import { EditEmployeeComponent } from './pages/employees/edit-employee/edit-employee.component';


export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirect to login if accessing the root
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard] }, // Protect employee list route
    { path: 'employee-detail/:id', component: EmployeeDetailComponent, canActivate: [AuthGuard] },  // Add dynamic route for employee detail
    { path: 'add-employee', component: AddEmployeeComponent, canActivate: [AuthGuard] }, // Protect employee list route
    { path: 'edit-employee/:id', component: EditEmployeeComponent, canActivate: [AuthGuard] }, // Protect employee list route

  ];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
