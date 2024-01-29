
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoremangersService {
  public REST_API_SERVER:string = `${environment.REST_API_URL}/api/${environment.version}`;

  constructor(private http:HttpClient,
      private router:Router) { }

  public GetStoremanagers(params:any = ""):Observable<any>{
    return this.http.post(`${this.REST_API_SERVER}/store-managerslist?${params.toString()}`,{ params: ""});
  }
}
