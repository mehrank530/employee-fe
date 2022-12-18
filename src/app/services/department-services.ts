import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DepartmentService {


  baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  getAllDepartments(): any {
    return this.http.get(this.baseUrl + '/api/department/', {
    });
  }
}
