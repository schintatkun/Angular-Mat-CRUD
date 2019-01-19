import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../../shared/employee.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DepartmentService } from '../../shared/department.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private service: EmployeeService,
    private departmentService: DepartmentService) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['fullName','email','mobile','city','departmentName','actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.service.getEmployees().subscribe(
      list => {
        let array = list.map(item =>{
          let departmentName = this.departmentService.getDepartmentName(item.payload.val()['department']);
          console.log(departmentName);
          return {
            $key: item.key,
            departmentName : departmentName,
            ...item.payload.val()
          }; 
        });
        this.listData = new MatTableDataSource(array); 
        //add sorting 
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
  }

  onSearchClear(){
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    //trim() remove white space
    this.listData.filter = this.searchKey.trim().toLocaleLowerCase();
  }
}
