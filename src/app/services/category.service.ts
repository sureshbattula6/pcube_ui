import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

export interface category {
  id: number;
  name: string;
}


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public REST_API_SERVER: string = `${environment.REST_API_URL}/api/${environment.version}`;

  constructor(private http: HttpClient,
    private router: Router) { }

    public getcategoryList(params): Observable<any> {
      return this.http.post(`${this.REST_API_SERVER}/category-list?${params.toString()}`,{ params: ""});
    }
  
    public categoryShow(id:number|string):Observable<any>{
      return this.http.get(`${this.REST_API_SERVER}/category-list/${id}`);
    }
  
    public categoryStore(params): Observable<any> {
      return this.http.post(`${this.REST_API_SERVER}/category-create`, params);
    }
  
    public updatecategory(id: any, params): Observable<any> {
      return this.http.put(`${this.REST_API_SERVER}/category-update/${id}`, params);
    }
  
    public deleteCategory(id: any): Observable<any> {
      return this.http.delete(`${this.REST_API_SERVER}/category-delete/${id}`);
    }

}
