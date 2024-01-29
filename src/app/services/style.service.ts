import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StyleService {

  public REST_API_SERVER:string = `${environment.REST_API_URL}/api/${environment.version}`;

  constructor(private http:HttpClient,
      private router:Router) { }

  public storeStyles(customer_id: any,cartId :any, orderItemId: any,orderId: any, updateType: any,button:any, lapel:any, vent:any, pocket:any, jodhpuri:any, type:any, pleat:any, pocket_type:any, back_pocket:any, shape:any, cut_way:any, collar_type:any, placket:any, cuff_type:any, other:any, shape_type:any, fit_type:any, remark:any): Observable<any> {

   return this.http.post(`${this.REST_API_SERVER}/styles-store`, {
    customer_id, cartId, orderItemId,orderId, updateType, button, lapel, vent, pocket, jodhpuri, type, pleat, pocket_type, back_pocket, shape, cut_way, collar_type, placket, cuff_type, other, shape_type, fit_type, remark
  });

  }

  public getstyles(id:any):Observable<any>{
    return this.http.put(`${this.REST_API_SERVER}/styles-show/${id}`,id);
  }



}
