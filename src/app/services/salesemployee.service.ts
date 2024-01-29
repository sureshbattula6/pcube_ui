import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface sales {

  id: number;
  name: string;
  // email: string;
  // password: string;

}

@Injectable({
  providedIn: 'root'
})
export class SalesemployeeService {
  public REST_API_SERVER: string = `${environment.REST_API_URL}/api/${environment.version}`;

  constructor(private http: HttpClient) { }


  //---getting the data and shown in console
  public getSaleEmployees():Observable<any>{
    return this.http.get(`${this.REST_API_SERVER}/sales-employees/}`);
  }

  public getemployeesList(params): Observable<any> {
    return this.http.post(`${this.REST_API_SERVER}/sales-employee?${params.toString()}`,{ params: ""});
  }

  public showSalesemployee(id:number|string):Observable<any>{
    return this.http.get(`${this.REST_API_SERVER}/sales-employee-show/${id}`);
  }

  public storeSales(params): Observable<any> {
    return this.http.post(`${this.REST_API_SERVER}/sales-employee-store`, params);
  }

  public updateSalesEmployee(id: any, params): Observable<any> {
    return this.http.put(`${this.REST_API_SERVER}/sales-employee-update/${id}`, params);
  }

  public deleteSalesEmployee(id: any): Observable<any> {
    return this.http.delete(`${this.REST_API_SERVER}/sales-employee-delete/${id}`);
  }
}

