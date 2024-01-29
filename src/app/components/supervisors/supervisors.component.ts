import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpParams } from '@angular/common/http';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

import { LoaderService } from '../../auth/services/loader.service';
import { SupervisorsService } from '../../services/supervisors.service';



import { 
        PAGE_SIZE_OPTIONS, 
        PAGE_LENGTH,
        ITEMS_PER_PAGE,
        CURRENT_PAGE } from '../../shared/constants/pagination.contacts';

import { User } from '../../shared/models/User';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { CommonService } from '../../services/common.service';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { FormControl, Validators } from '@angular/forms';


  const dialogConfig= new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;

  @Component({
    selector: 'app-supervisors',
    templateUrl: './supervisors.component.html',
    styleUrls: ['./supervisors.component.css']
  })
export class SupervisorsComponent implements OnInit {
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['name', 'email','role_name','actions'];
 
  public PAGE_SIZE_OPTIONS_DATA:number[] = PAGE_SIZE_OPTIONS;

  public page_length:number = PAGE_LENGTH;

  public items_per_page:number = ITEMS_PER_PAGE;

  public current_page:number = CURRENT_PAGE;


  public ROLE_ID:string = this.authenticationService.getRoleId();
  public MENU_PERMISSIONS:any = this.authenticationService.getMenuPermissions();

  roles: User[];
  dataSource = new MatTableDataSource<User>();

  public filter:FormControl = new FormControl("",Validators.required)
  
  constructor(
    private dialog:MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private loaderService:LoaderService,
    private commonService:CommonService,
    private authenticationService:AuthenticationService,
    private SupervisorsService:SupervisorsService,
    
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
    let params = new HttpParams();
    params = params.set('current_page', currentPage);
    params = params.set('per_page', perPage);
    let filter = this.filter.value;
    params = params.set('filter',filter);

    this.SupervisorsService.GetSupervisors(params)
    .subscribe((response: any) =>{
      this.dataSource = new MatTableDataSource<User>(response.data);
      this.dataSource.paginator = this.paginator;
      this.page_length = response.total;
    })
  }

  advancedFilter(){
    this.getData(this.current_page, this.page_length);
  }

  pageChanged(event: PageEvent) {
    this.page_length = event.pageSize;
    this.current_page = event.pageIndex + 1;
    this.getData(this.current_page, this.page_length);
  }


}


