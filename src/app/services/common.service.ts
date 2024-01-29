import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig,  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition  } from '@angular/material/snack-bar';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public REST_API_SERVER:string = `${environment.REST_API_URL}/api/${environment.version}`;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor( private _snackBar: MatSnackBar,
    private http:HttpClient) { }

  openAlert(message:string) {
    // let config;
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-snackbar']; // Apply custom CSS class
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = 3000; // Set duration in milliseconds
    this._snackBar.open(message,'Dismiss', config);
  }

  public getDashboardDetails():Observable<any>{
    return this.http.get(`${this.REST_API_SERVER}/dashboard`);
  }
}
