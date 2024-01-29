import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PAGE_SIZE_OPTIONS, PAGE_LENGTH, ITEMS_PER_PAGE, CURRENT_PAGE } from '../../shared/constants/pagination.contacts';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '../../services/common.service';
import { ProductService } from '../../services/product.service';
import { HttpParams } from '@angular/common/http';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  @Output() productAdded = new EventEmitter();
  
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;

  public PAGE_SIZE_OPTIONS_DATA:number[] = PAGE_SIZE_OPTIONS;

  public page_length:number = PAGE_LENGTH;

  public items_per_page:number = ITEMS_PER_PAGE;

  public current_page:number = CURRENT_PAGE;

  public products:any = [];
  
  public dataSource = new MatTableDataSource<any>();

  public cartProductList = [];

  public customerId:string|number = this.authenticationService.getCustomerId();

  public toggle = new FormControl(false);
  public showView:boolean = false;

  public item_types:any[];
  

  public productForm: FormGroup;

  public advanceSerch: boolean = false;
  public filter:FormControl = new FormControl("");
  
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private commonService:CommonService,
    private productService:ProductService,
    private authenticationService:AuthenticationService,
    private fb: FormBuilder,
  ) { 
    matIconRegistry.addSvgIcon(
      "filter",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../../../assets/SVG/filter.svg")
      );
      
  }
  
  ngOnInit(): void {    
    document.querySelector('body').classList.toggle('az-sidebar-hide');
    this.createForm();
   
    this.getProductData();

    this.getData(this.current_page, this.page_length);

    this.toggle.valueChanges.subscribe(e => {
        this.showView = e;
    });

    this.filter.valueChanges.subscribe((f) => {
        this.getData(this.current_page, this.page_length = 1000);
    });
  }

  createForm(){
    this.productForm = this.fb.group({
      item_type: [''],
      item_code: [''],
      price: [''],
      model: [''],
      color: [''],
      size: [''],
      
    })
  }

  get formValidate(){
    return this.productForm.controls;
  }

  resetFilter(){
    this.productForm.reset();
    this.advanceSerch = false;
    this.getData(this.current_page, this.page_length = 1000);
  }

  productFormSubmit() {
    this.advanceSerch = true;
    this.filter.setValue("");
    this.getData(this.current_page, this.page_length);
  }

  getProductData(){
    this.productService.createProduct().subscribe(
        (res:any)=>{
            this.item_types = res.data.item_types;
            console.log(this.item_types);return;
           
            
        }
      )
  }

 
  getData(currentPage, perPage):void{
    let params = new HttpParams();
    params = params.set('current_page', currentPage);
    params = params.set('per_page', perPage);

    if(this.filter.value != "") {
      let filter = this.filter.value;
      params = params.set('filter',filter);
    }

    if(this.advanceSerch) {
      let filter = JSON.stringify(this.productForm.value);
      params = params.set('advanceFilter',filter);
    }
   
    this.productService.getProducts(params)
    .subscribe((response: any) =>{
      this.products = response.data;
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

  addProductToCart(id:any) {
    let params = { productId: id, customerId: this.customerId };
    this.productService.productAddToCart(params).subscribe(
      (response:any) =>{
        let data = response.data;
        this.commonService.openAlert(response.message);         
      }
    )
  }


}
