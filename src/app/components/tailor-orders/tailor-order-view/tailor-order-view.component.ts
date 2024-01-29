import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { TailorsService } from '../../../services/tailors.service';
import { CommonService } from 'src/app/services/common.service';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-tailor-order-view',
  templateUrl: './tailor-order-view.component.html',
  styleUrls: ['./tailor-order-view.component.css']
})
export class TailorOrderViewComponent implements OnInit {

  public SERVER_PATH = environment.REST_API_URL;
  public orderId:number;
  public customer:any;
  public status:any;
  public orderItems:any[] = [];
  public order:any;
  public total:number = 0;

  public paidAmount: number;
  public balanceAmount: number;

  public orderPayments:any[] = [];
  public measurementId:number;

  public tailors: any[] = [];
  public userDetails = this.authenticationService.getUserDetails();
  public userId;
  constructor(private productService: ProductService,
              private router:ActivatedRoute,
              private tailorsService:TailorsService,
              private commonService: CommonService,
              private authenticationService: AuthenticationService,
              private location: Location
              ) { }

  ngOnInit(): void {

    this.orderId = +this.router.snapshot.paramMap.get('orderId');
    this.getData();
    this.getStatusList();
    this.userId = (this.userDetails != null)? this.userDetails.user_id.toString() : '';
  }

  getData(){
    const userId = (this.userDetails != null)? this.userDetails.user_id.toString() : '';
    const param = {
      tailorId : userId
    }
    this.productService.getTailorOrderView(this.orderId, param)
    .subscribe(
      (response: any) => {
        this.orderItems = response.orderitems;
        this.customer = response.customer;
      console.log('tailor order view', response)
      },
      (error) => {
        console.log('Error', error)
      }
    )
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

  statusChange(statusId: any, itemId:any){
    // console.log(itemId);
    const userId = (this.userDetails != null)? this.userDetails.user_id.toString() : '';

    const param = {
      statusId: statusId.value,
      orderId: this.orderId,
      itemId: itemId,
      userId:userId
    }
    console.log(param)
    this.tailorsService.statusInsert(param).subscribe(
      (response:any)=>{
        this.commonService.openAlert(response.message);
        console.log(response)
      },
      (err)=> console.log(err)
    )
   }

   goBack(): void {
    this.location.back();
  }

}
