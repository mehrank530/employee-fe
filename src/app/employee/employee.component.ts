import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeServices} from '../services/employee-services';
import {EmployeeModel} from '../models/EmployeeModel';
import {HttpClient} from '@angular/common/http';
import {DepartmentService} from '../services/department-services';
import {DepartmentModel} from '../models/DepartmentModel';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  addForm: FormGroup;
  employeesList: EmployeeModel[];
  employee: EmployeeModel;
  employeeId: number;
  isSaveMode: boolean;
  departmentsList: DepartmentModel[];
  NameOrNumberSearchControl = new FormControl();
  departmentSearchControl = new FormControl();

  constructor(private formBuilder: FormBuilder, private employeeServices: EmployeeServices, private http: HttpClient,
              private departmentService: DepartmentService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      employeeNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      employeeName: ['', Validators.required],
      dateOfJoining: ['', Validators.required],
      salary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      department: ['', Validators.required],
    });
    this.departmentSearchControl.setValue('');
    this.isSaveMode = true;
    this.getAllEmployees();
    this.departmentService.getAllDepartments().subscribe(
      resp => {
        this.departmentsList = resp;
        this.cdr.detectChanges();
      }, err => {
        console.log(err);
      });
  }

  onSave() {
    if (this.addForm.invalid) {
      Swal.fire(
        'error',
        'invalid form',
        'error'
      );
    } else {
      this.employeeId = null;
      this.employee = new EmployeeModel();
      this.employee.employeeNumber = this.addForm.controls.employeeNumber.value;
      this.employee.employeeName = this.addForm.controls.employeeName.value;
      this.employee.department = new DepartmentModel();
      this.employee.department.id = this.addForm.controls.department.value;
      this.employee.dateOfJoining = this.addForm.controls.dateOfJoining.value;
      this.employee.salary = this.addForm.controls.salary.value;
      this.employeeServices.saveEmployee(this.employee).subscribe(
        resp => {
          Swal.fire(
            'Success',
            resp.message,
            'success'
          );
          this.addForm.reset();
          this.getAllEmployees();
        }, err => {
          Swal.fire(
            'error',
            err,
            'error'
          );
        });
    }
  }


  onUpdate() {
    if (this.addForm.invalid) {
      Swal.fire(
        'error',
        'invalid form',
        'error'
      );
    } else {
      this.employee = new EmployeeModel();
      this.employee.id = this.employeeId;
      this.employee.employeeNumber = this.addForm.controls.employeeNumber.value;
      this.employee.employeeName = this.addForm.controls.employeeName.value;
      this.employee.department = new DepartmentModel();
      this.employee.department.id = this.addForm.controls.department.value;
      this.employee.dateOfJoining = this.addForm.controls.dateOfJoining.value;
      this.employee.salary = this.addForm.controls.salary.value;
      this.employeeServices.updateEmployee(this.employee).subscribe(
        resp => {
          this.employee = null;
          Swal.fire(
            'Success',
            resp.message,
            'success'
          );
          this.addForm.reset();
          this.getAllEmployees();
        }, err => {
          Swal.fire(
            'Error',
            err,
            'error'
          );
        });
    }
  }

  onClear() {
    this.employeeId = null;
    this.addForm.reset();
    this.departmentSearchControl.setValue('');
    this.addForm.controls.department.setValue('');
    this.isSaveMode = true;
  }

  editEmployee(employee: EmployeeModel) {
    this.isSaveMode = false;
    this.employeeId = employee.id;
    this.addForm.controls.employeeNumber.setValue(employee.employeeNumber);
    this.addForm.controls.employeeName.setValue(employee.employeeName);
    this.addForm.controls.department.setValue(employee.department.id);
    this.addForm.controls.dateOfJoining.setValue(employee.dateOfJoining);
    this.addForm.controls.salary.setValue(employee.salary);
  }

  deleteEmployee(employee: EmployeeModel) {
    this.employeeServices.deleteEmployee(employee.id).subscribe(
      resp => {
        Swal.fire(
          'Success',
          resp.message,
          'success'
        );
        this.isSaveMode = true;
        this.getAllEmployees();
      }, err => {
        Swal.fire(
          'Error',
          err,
          'error'
        );
      });
  }


  getAllEmployees() {
    this.employeeServices.getAllEmployees().subscribe(
      res => {
        this.employeesList = res;
        this.cdr.detectChanges();
      }, err => {
        console.log(err);
      });
  }


  onSearch() {
    if (this.NameOrNumberSearchControl.value) {
      // checking the text is only numbers or String
      // because employee number will be always only digits.
      if (Number(this.NameOrNumberSearchControl.value)) {
        this.employeeServices.getByEmployeeNumber(this.NameOrNumberSearchControl.value).subscribe(
          res => {
            this.employeesList = res;
            this.cdr.detectChanges();
            this.NameOrNumberSearchControl.reset();
            this.departmentSearchControl.setValue('');
          }, err => {
            console.log(err);
          });
      } else {
        this.employeeServices.getByEmployeeName(this.NameOrNumberSearchControl.value).subscribe(
          res => {
            this.employeesList = res;
            this.cdr.detectChanges();
            this.NameOrNumberSearchControl.reset();
            this.departmentSearchControl.setValue('');
          }, err => {
            console.log(err);
          });
      }
    } else if (this.departmentSearchControl.value) {
      this.employeeServices.getEmployeeByDepartment(this.departmentSearchControl.value).subscribe(
        res => {
          this.employeesList = res;
          this.cdr.detectChanges();
          this.departmentSearchControl.reset();
          this.departmentSearchControl.setValue('');
        }, err => {
          console.log(err);
        });
    } else {
      Swal.fire(
        'Warning',
        'Enter Search Text Or Select Department For Filter',
        'warning'
      );
    }
  }

  onClearFilter() {
    this.getAllEmployees();
    this.departmentSearchControl.setValue('');
  }
}
