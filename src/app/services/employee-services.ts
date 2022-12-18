import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EmployeeModel} from '../models/EmployeeModel';

@Injectable()
export class EmployeeServices {


  baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAllEmployees(): any {
    return this.http.get(this.baseUrl + '/api/employee/', {
    });
  }

  saveEmployee(employee: EmployeeModel): any {
    return this.http.post(this.baseUrl + '/api/employee/', employee, {});
  }

  updateEmployee(employee: EmployeeModel): any {
    return this.http.put(this.baseUrl + '/api/employee/', employee, {});
  }

  deleteEmployee(id: any): any {
    return this.http.delete(this.baseUrl + '/api/employee/' + id, {});
  }

  getEmployeeByDepartment(department: any): any {
    return this.http.get(this.baseUrl + '/api/employee/department/' + department, {});
  }

  getByEmployeeName(value: string): any {
    return this.http.get(this.baseUrl + '/api/employee/name/' + value, {});
  }

  getByEmployeeNumber(no: any): any {
    return this.http.get(this.baseUrl + '/api/employee/number/' + no, {});
  }
}
