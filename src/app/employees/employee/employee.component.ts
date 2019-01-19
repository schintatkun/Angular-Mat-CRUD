import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "../../shared/employee.service";
import { DepartmentService } from '../../shared/department.service';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  constructor(private service: EmployeeService,
    private notificationService: NotificationService,
    private departmentService: DepartmentService) {}

  // departments = [
  //   { id: 1, value: "Dept 1" },
  //   { id: 2, value: "Dept 2" },
  //   { id: 3, value: "Dept 3" }
  // ];

  ngOnInit() {
    this.service.getEmployees();
  }
  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit(){
    if (this.service.form.valid){
      console.log(this.service.form.value);
      this.service.insertEmployee(this.service.form.value);
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted successfull');      
    }
  }
}
