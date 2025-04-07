import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo) {}

  // Login Mutation
  login(username: string, password: string): Observable<any> {
    const LOGIN_MUTATION = gql`
      query {
        login(username: "${username}", password: "${password}") {
          token
          user {
            id
            email
          }
        }
      }
    `;
    return this.apollo.mutate({
      mutation: LOGIN_MUTATION,
    });
  }

  // Signup Mutation
  signup(username: string, email: string, password: string): Observable<any> {
    const SIGNUP_MUTATION = gql`
      mutation {
        signup(username: "${username}", email: "${email}", password: "${password}") {
          id
          username
          email
          created_at
        }
      }
    `;
    return this.apollo.mutate({
      mutation: SIGNUP_MUTATION,
    });
  }

  // Query to fetch all employees
  getAllEmployees(): Observable<any> {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getAllEmployees {
            id
            first_name
            last_name
            email
            designation
            department
          }
        }
      `,
    }).valueChanges;
  }

  // Query to fetch a specific employee by ID
  searchEmployeeById(id: string): Observable<any> {
    return this.apollo.query({
      query: gql`
        query {
          searchEmployeeById(id: "${id}") {
            first_name
            last_name
            email
            salary
            designation
            department
          }
        }
      `,
    });
  }
  
  // Mutation to add a new employee
  addEmployee(
    first_name: string,
    last_name: string,
    email: string,
    gender: string,
    designation: string,
    salary: number,
    date_of_joining: string,
    department: string,
  ): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          addEmployee(
            first_name: "${first_name}"
            last_name: "${last_name}"
            email: "${email}"
            gender: "${gender}"
            designation: "${designation}"
            salary: ${salary}
            date_of_joining: "${date_of_joining}"
            department: "${department}"
          ) {
            id
            first_name
            last_name
            email
            department
            designation
          }
        }
      `,
    });
  }

  // Mutation to delete an employee by ID
  deleteEmployee(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: gql`
        mutation {
          deleteEmployee(id: "${id}")
        }
      `,
    });
  }

  // Inside GraphqlService
updateEmployee(
  id: string,
  designation: string,
  salary: number
): Observable<any> {
  return this.apollo.mutate({
    mutation: gql`
      mutation {
        updateEmployee(
          id: "${id}"
          designation: "${designation}"
          salary: ${salary}
        ) {
          first_name
          last_name
          email
          salary
          designation
          department
        }
      }
    `,
  });
}

// Query to search employees by designation or department
searchEmployeeByDesignationOrDepartment(
  designation: string,
  department: string
): Observable<any> {
  const SEARCH_EMPLOYEES = gql`
    query {
      searchEmployeeByDesignationOrDepartment(
        designation: "${designation}",
        department: "${department}"
      ) {
        first_name
        last_name
        email
        designation
        department
      }
    }
  `;
  return this.apollo.query({
    query: SEARCH_EMPLOYEES,
  });
}
  
}
