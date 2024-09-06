import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS, PAGE_LENGTH, ITEMS_PER_PAGE, CURRENT_PAGE } from '../../shared/constants/pagination.contacts';
import { User } from '../../auth/models/users';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from '../../auth/services/loader.service';
import { UsersService } from '../../services/users.service';
import { CommonService } from '../../services/common.service';
import { HttpParams } from '@angular/common/http';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerService } from '../../services/customer.service';
import { FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';


const dialogConfig= new MatDialogConfig();
dialogConfig.disableClose = true;
dialogConfig.autoFocus = true;

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  public SERVER_PATH = environment.REST_API_URL;

  @ViewChild('paginator', {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['images','name', 'email','phone','code','actions'];// 'age','profession','lifestyle'

  public PAGE_SIZE_OPTIONS_DATA:number[] = PAGE_SIZE_OPTIONS;

  public page_length:number = PAGE_LENGTH;

  public items_per_page:number = ITEMS_PER_PAGE;

  public current_page:number = CURRENT_PAGE;
  public pageIndex:number = 0;
  roles: User[];
  dataSource = new MatTableDataSource<User>();
  public filter:FormControl = new FormControl("",Validators.required)

  constructor(
    private dialog:MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private loaderService:LoaderService,
    private commonService:CommonService,
    private customerService:CustomerService,
    private router:Router,
    private authenticationService:AuthenticationService,

  ) {
    matIconRegistry.addSvgIcon(
      "filter",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/SVG/filter.svg")
      );

  }
  customerId?:any;

  ngOnInit(): void {
    this.getData(this.current_page, this.items_per_page);
  }

  ngAfterViewInit(){
    // this.dataSource.paginator = this.paginator;
  }

  createCustomer():void{
    dialogConfig.width ="60%";
    dialogConfig.data = {
      id: undefined,
    }
    this.dialog.open(CustomerCreateComponent,dialogConfig);


    // UPDATE CONTACT DETAILS AFTER CREATING THE CONTACT
    this.dialog.afterAllClosed.subscribe(e=>{
      this.getData(this.current_page, this.items_per_page);
    });
  }

  edit(id:number):void{
    dialogConfig.width ="60%";
    dialogConfig.data = {
      id: id,
    }

    this.dialog.open(CustomerCreateComponent,dialogConfig);

    // UPDATE CONTACT DETAILS AFTER CREATING THE CONTACT
    this.dialog.afterAllClosed.subscribe(e=>{
      this.getData(this.current_page, this.items_per_page);
    });
  }

  delete(id:number):void{

    dialogConfig.width ="20%";
    dialogConfig.height ="30%";
    dialogConfig.data = {
      title: "Confirm Action",
      message : "Are you sure you want to delete the Customer?",
      id: id,
   };

    const dialogRef = this.dialog.open(ConfirmDialogComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(
      (res) => {
          if(res.status){
            this.deleteCustomer(res.id);
          }
      }
    );

  }

  deleteCustomer(id:string){
    let params = new HttpParams();
    params = params.set('id', id);
    this.customerService.deleteCustomer(params).subscribe(
      (res)=>{
          this.commonService.openAlert(res.message);
          this.getData(this.current_page, this.items_per_page);
      }
    )
  }

  advancedFilter(){
    this.current_page = 0;
    this.pageIndex = 0;
    this.getData(this.current_page, this.items_per_page);
  }

  getData(currentPage, perPage):void{
    let params = new HttpParams();
    params = params.set('current_page', currentPage);
    params = params.set('per_page', perPage);
    let filter = this.filter.value;
    params = params.set('filter',filter);

    this.customerService.getCustomers(params)
    .subscribe((response: any) =>{
      this.dataSource = new MatTableDataSource<any>(response.data);
          // this.dataSource.paginator = this.paginator;
      this.page_length = response.total;
    })
  }

  pageChanged(event: PageEvent) {
    this.page_length = event.pageSize;
    this.current_page = event.pageIndex + 1;
    this.pageIndex = event.pageIndex;
    this.getData(this.current_page, this.page_length);
  }

  placeOrder(customerId: number) {
    this.authenticationService.setCustomerId(customerId);
    this.router.navigate(['/', 'order-products']);
  }

  gotoCart(customerId: number) {
    this.authenticationService.setCustomerId(customerId);
    this.router.navigate(['/', 'cart']);
  }

}
