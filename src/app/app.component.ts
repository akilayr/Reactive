import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalpopupComponent } from './modalpopup/modalpopup.component';
import { OrderDetail } from './Model/OrderDetail';
import { MasterService } from './Service/master.service';
import * as alertify from 'alertifyjs'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'app1';
  //displayedColumns: string[] = ['code', 'name', 'phone', 'email', 'action'];
  displayedColumns: string[] = ['orderID', 'orderNumber', 'received', 'startedDate', 'completedDate', 'assignedTo', 'completedBy', 'action'];
  dataSource: any;
  orderdata: any;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  constructor(private service: MasterService, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.GetAll();
    this.service.RequiredRefresh.subscribe(r => {
      this.GetAll();
    });
  }

  GetAll() {
    this.service.getOrder().subscribe(result => {
      this.orderdata = result;
      this.dataSource = new MatTableDataSource<OrderDetail>(this.orderdata)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  Filterchange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }
  getrow(row: any) {
    //console.log(row);
  }
  FunctionEdit(orderID: any) {
    this.OpenDialog('1000ms','600ms',orderID)
  }
  FunctionDelete(orderID: any) {
    alertify.confirm("Remove Order","Do you want to remove?",()=>{
      this.service.Remove(orderID).subscribe(result => {
        this.GetAll();
        alertify.success("Removed successfully.")
      });

    },function(){

    })
    
  }

  OpenDialog(enteranimation: any, exitanimation: any, orderID:any) {
    this.dialog.open(ModalpopupComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: "50%",
      data:{
        ordercode:orderID
      }
    })
  }
}
