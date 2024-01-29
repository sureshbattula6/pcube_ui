import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
@Component({
  selector: 'app-dashboard-default',
  templateUrl: './dashboard-default.component.html',
  styleUrls: ['./dashboard-default.component.css']
})
export class DashboardDefaultComponent implements OnInit {

  public userDetails = this.authenticationService.getUserDetails();

  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit(): void {
  }

}
