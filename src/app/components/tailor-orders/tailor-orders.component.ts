import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { environment } from '../../../environments/environment';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS, PAGE_LENGTH, ITEMS_PER_PAGE, CURRENT_PAGE } from '../../shared/constants/pagination.contacts';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from '../../auth/services/loader.service';
import { CommonService } from '../../services/common.service';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { HttpParams } from '@angular/common/http';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { TailorsService } from '../../services/tailors.service';
import { identifierModuleUrl } from '@angular/compiler';

const dialogConfig= new MatDialogConfig();
dialogConfig.disableClose = true;
dialogConfig.autoFocus = true;

@Component({
  selector: 'app-tailor-orders',
  templateUrl: './tailor-orders.component.html',
  styleUrls: ['./tailor-orders.component.css']
})
export class TailorOrdersComponent implements OnInit {

  public SERVER_PATH = environment.REST_API_URL;

  @ViewChild('paginator', {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['id', 'customer_name', 'actions'];//,'model','color','size','frame_type','collection_type','material','prescription_type','glass_color','frame_width','catalog_no','actions'

  public PAGE_SIZE_OPTIONS_DATA:number[] = PAGE_SIZE_OPTIONS;

  public page_length:number = PAGE_LENGTH;

  public items_per_page:number = ITEMS_PER_PAGE;

  public current_page:number = CURRENT_PAGE;

  dataSource = new MatTableDataSource<any[]>();

  public filter:FormControl = new FormControl("",Validators.required)

  public customerId:string|number = this.authenticationService.getCustomerId();
  public userDetails = this.authenticationService.getUserDetails();

  public status: any[] = [];

  constructor(
    private dialog:MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private loaderService:LoaderService,
    private commonService:CommonService,
    private productService:ProductService,
    private tailorsService:TailorsService,
    private authenticationService:AuthenticationService
  ) {
    matIconRegistry.addSvgIcon(
      "filter",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/SVG/filter.svg")
      );

  }

  ngOnInit(): void {
    this.getData(this.current_page, this.page_length);
    this.getStatusList();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  advancedFilter(){
    this.getData(this.current_page, this.page_length);
  }

  getData(currentPage, perPage):void{
    const customerId = (this.customerId != null)? this.customerId.toString() : '';
    const userId = (this.userDetails != null)? this.userDetails.user_id.toString() : '';
    let params = new HttpParams();
    params = params.set('current_page', currentPage);
    params = params.set('per_page', perPage);
    params = params.set('customerId', customerId);
    params = params.set('userId', userId);
    params = params.set('tailor_id', userId);

    let filter = this.filter.value;
    params = params.set('filter',filter);

    this.productService.getTailorOrders(params)
    .subscribe((response: any) => {
      console.log('tailor ordres', response)
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

  tailorProduct(products: any) {
    const userId = (this.userDetails != null)? this.userDetails.user_id.toString() : '';
    return products.filter((order:any) => order.tailor_id == userId);;
  }
  getStatusList() {
    this.tailorsService.GetStatus().subscribe(
      (res: any) => {
        // console.log('status', res)
        this.status = res;

      },
      (err) => console.log('Error ', err)
    );
  }

  statusChange(statusId: any,orderId:any, itemId:any){
    // console.log(itemId);
    const userId = (this.userDetails != null)? this.userDetails.user_id.toString() : '';

    const param = {
      statusId: statusId.value,
      orderId: orderId,
      itemId: itemId,
      userId:userId
    }
    console.log(param)
    this.tailorsService.statusInsert(param).subscribe(
      (response:any)=>{
        console.log(response)
      },
      (err)=> console.log(err)
    )
   }


}
