import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS, PAGE_LENGTH, ITEMS_PER_PAGE, CURRENT_PAGE } from '../../shared/constants/pagination.contacts';
import { User } from '../../auth/models/users';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from '../../auth/services/loader.service';
import { CommonService } from '../../services/common.service';
import { CustomerService } from '../../services/customer.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { HttpParams } from '@angular/common/http';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductService } from '../../services/product.service';
import { FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';

const dialogConfig= new MatDialogConfig();
dialogConfig.disableClose = true;
dialogConfig.autoFocus = true;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,AfterViewInit {
  public SERVER_PATH = environment.REST_API_URL;

  @ViewChild('paginator', {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['image','name','category','item_code', 'price','gst','actions'];//'item_description','model','color','size','frame_type','collection_type','material','prescription_type','glass_color','frame_width','catalog_no'

  public PAGE_SIZE_OPTIONS_DATA:number[] = PAGE_SIZE_OPTIONS;

  public page_length:number = PAGE_LENGTH;

  public items_per_page:number = ITEMS_PER_PAGE;

  public current_page:number = CURRENT_PAGE;

  dataSource = new MatTableDataSource<any[]>();

  public filter:FormControl = new FormControl("",Validators.required)

  constructor(
    private dialog:MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private loaderService:LoaderService,
    private commonService:CommonService,
    private productService:ProductService
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

  createCustomer():void{
    dialogConfig.width ="60%";
    dialogConfig.data = {
      id: undefined,
    }
    this.dialog.open(ProductCreateComponent,dialogConfig);


    // UPDATE CONTACT DETAILS AFTER CREATING THE CONTACT
    this.dialog.afterAllClosed.subscribe(e=>{
      this.getData(this.current_page, PAGE_LENGTH);
    });
  }

  edit(id:number):void{
    dialogConfig.width ="60%";
    dialogConfig.data = {
      id: id,
    }

    this.dialog.open(ProductCreateComponent,dialogConfig);

    // UPDATE CONTACT DETAILS AFTER CREATING THE CONTACT
    this.dialog.afterAllClosed.subscribe(e=>{
      this.getData(this.current_page, PAGE_LENGTH);
    });
  }

  delete(id:number):void{
    dialogConfig.panelClass = "delelteModel";
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
    this.productService.deleteProduct(params).subscribe(
      (res)=>{
          this.commonService.openAlert(res.message);
          this.getData(this.current_page, this.page_length);
      }
    )
  }

  advancedFilter(){
    this.getData(this.current_page, this.page_length);
  }

  getData(currentPage, perPage):void{
    let params = new HttpParams();
    params = params.set('current_page', currentPage);
    params = params.set('per_page', perPage);

    let filter = this.filter.value;
    params = params.set('filter',filter);

    this.productService.getProducts(params)
    .subscribe((response: any) =>{
      this.dataSource = new MatTableDataSource<any>(response.data);
      this.dataSource.paginator = this.paginator;
      this.page_length = response.total;
    })
  }

  pageChanged(event: PageEvent) {
    this.page_length = event.pageSize;
    this.current_page = event.pageIndex + 1;
    this.getData(this.current_page, this.page_length);
  }



}
