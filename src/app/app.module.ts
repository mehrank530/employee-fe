import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EmployeeComponent} from './employee/employee.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {EmployeeServices} from './services/employee-services';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DepartmentService} from "./services/department-services";

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [EmployeeServices, DepartmentService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
