import { Component, OnInit, ViewChild } from '@angular/core';
import { PAGE_SIZE_OPTIONS, PAGE_LENGTH, ITEMS_PER_PAGE, CURRENT_PAGE } from '../../../shared/constants/pagination.contacts';
import { MatTableDataSource } from '@angular/material/table';
import { HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from '../../../auth/services/loader.service';
import { CommonService } from '../../../services/common.service';

import { AuthenticationService } from '../../../auth/services/authentication.service';

import { environment } from '../../../../environments/environment';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { CustomerService } from 'src/app/services/customer.service';
import { MeasurmentService } from 'src/app/services/measurment.service';
@Component({
  selector: 'app-customer-measurements',
  templateUrl: './customer-measurements.component.html',
  styleUrls: ['./customer-measurements.component.css']
})
export class CustomerMeasurementsComponent implements OnInit {

  public SERVER_PATH = environment.REST_API_URL;

  @ViewChild('paginator', {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['title', 'created_at', 'actions'];
  public PAGE_SIZE_OPTIONS_DATA:number[] = PAGE_SIZE_OPTIONS;

  public page_length:number = PAGE_LENGTH;

  public items_per_page:number = ITEMS_PER_PAGE;

  public current_page:number = CURRENT_PAGE;

  dataSource = new MatTableDataSource<any[]>();


  public customerId:string|number = this.authenticationService.getCustomerId();
  public userDetails = this.authenticationService.getUserDetails();

  constructor(
    private dialog:MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private loaderService:LoaderService,
    private commonService:CommonService,
    private customerservice:CustomerService,
    private measurementservice: MeasurmentService,
    private authenticationService:AuthenticationService
  ) {
    matIconRegistry.addSvgIcon(
      "filter",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/SVG/filter.svg")
      );

  }

  ngOnInit(): void {
    this.getData(this.current_page, this.page_length);
  }

  ngAfterViewInit(){
    // this.dataSource.paginator = this.paginator;
  }


  getData(currentPage, perPage):void{
    const customerId = (this.customerId != null)? this.customerId.toString() : '';
    let params = new HttpParams();
    params = params.set('current_page', currentPage);
    params = params.set('per_page', perPage);
    params = params.set('customerId', customerId);
   if( customerId !== ''){
      this.measurementservice.getmeasurementList(customerId)
      .subscribe((response: any) =>{
        this.dataSource = new MatTableDataSource<any>(response.data);
        this.dataSource.paginator = this.paginator;
        this.page_length = response.total;
      })
   }

  }

  pageChanged(event: PageEvent) {
    this.page_length = event.pageSize;
    this.current_page = event.pageIndex + 1;
    this.getData(this.current_page, this.page_length);
  }
}
