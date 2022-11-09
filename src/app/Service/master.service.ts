import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject,tap } from 'rxjs';
import { OrderDetail } from '../Model/OrderDetail';

const httpOptions = {

  headers: new HttpHeaders({ 'Content-Type': 'application/json' })

}

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiurl = 'https://localhost:7158/api/Orders';

  private _refreshrequired=new Subject<void>();
  get RequiredRefresh(){
    return this._refreshrequired;
  }

  constructor(private http: HttpClient) {

  }
  getOrder(): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(this.apiurl);
  }
  getOrderId(orderID:any){
    return this.http.get(this.apiurl+'/'+orderID);
  }
  Remove(orderID:any){
    return this.http.delete(this.apiurl+'/'+orderID);
  }
  Save(inputdata:any){
    return this.http.post(this.apiurl,inputdata, httpOptions).pipe(
      tap(()=>{
this.RequiredRefresh.next();
      })
    );
  }

  // GetDes(){
  //   return this.http.get('https://localhost:44308/Designation');
  // }
}
