import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MasterService } from '../Service/master.service';
import * as alertify from 'alertifyjs'
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modalpopup',
  templateUrl: './modalpopup.component.html',
  styleUrls: ['./modalpopup.component.css']
})
export class ModalpopupComponent implements OnInit {

  constructor(private service: MasterService, 
              public dialogref: MatDialogRef<ModalpopupComponent>,
              @Inject(MAT_DIALOG_DATA) 
              public data:any) { }

  desdata: any;
  respdata: any;
  editdata: any;

  ngOnInit(): void {
    // this.loadDes();
    if(this.data.ordercode!=null && this.data.ordercode!=''){
this.LoadEditData(this.data.ordercode);
    }
  }

  // loadDes() {
  //   this.service.GetDes().subscribe(result => {
  //     this.desdata = result;
  //   });
  // }

  LoadEditData(orderID: any) {
    this.service.getOrderId(orderID).subscribe(item => {
      this.editdata = item;
      this.Reactiveform.setValue({orderID:this.editdata.orderID,
        orderNumber:this.editdata.orderNumber,
        received:this.editdata.received,
        startedDate:this.editdata.startedDate,
        completedDate:this.editdata.completedDate,
        assignedTo:this.editdata.assignedTo,
        completedBy:this.editdata.completedBy
        // gender:'M',
        // isactive:true
      })
    });
  }

  Reactiveform = new FormGroup({
    orderID: new FormControl({ value: 0, disabled: true }),
    orderNumber: new FormControl("", Validators.required),
    received: new FormControl("", Validators.required),
    startedDate: new FormControl("", Validators.required),
    completedDate: new FormControl("", Validators.required),
    assignedTo: new FormControl("", Validators.required),
    completedBy: new FormControl("", Validators.required),
    // completedDate: new FormControl(""),
    // gender: new FormControl("M"),
    // isactive: new FormControl(true)
  });



  saveOrder() {
    if (this.Reactiveform.valid) {
      this.service.Save(this.Reactiveform.value).subscribe({
        next: (result) => {
        this.respdata = result;
        // if (this.respdata.result) {
          // alertify.success("saved successfully.")
          // this.dialogref.close();
        //}
      }, 
      error: (err: HttpErrorResponse) => {
        console.log("hello");
        console.log(err.status);
      }
    
    });

    } 
    
    else {
      alertify.error("Please Enter valid data")
    }
  }

}
