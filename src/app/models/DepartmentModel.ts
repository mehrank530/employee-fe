export class DepartmentModel {
  id: number;
  departmentCode: string;
  description: string;

  clear() {
    this.id = undefined;
    this.departmentCode = undefined;
    this.description = undefined;
  }
}
