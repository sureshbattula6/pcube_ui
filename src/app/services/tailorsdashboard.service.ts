import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TailorsdashboardService {

  public REST_API_SERVER:string = `${environment.REST_API_URL}/api/${environment.version}`;

  constructor(private http:HttpClient,
    private router:Router) { }
    
      public getDashboardDetails(userId: any): Observable<any> {
        return this.http.get(`${this.REST_API_SERVER}/tailors-dashboard/${userId}`);
      }
  
    }
  


