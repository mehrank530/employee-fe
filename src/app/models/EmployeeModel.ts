import {DepartmentModel} from './DepartmentModel';

export class EmployeeModel {
  id: number;
  employeeNumber: string;
  employeeName: string;
  dateOfJoining: string;
  department: DepartmentModel;
  salary: string;

  clear() {
    this.id = undefined;
    this.employeeNumber = undefined;
    this.employeeName = undefined;
    this.dateOfJoining = undefined;
    this.salary = undefined;
  }
}
