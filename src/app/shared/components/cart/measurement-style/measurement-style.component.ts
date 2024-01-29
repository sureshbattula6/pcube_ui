import { Component,  OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../../services/common.service';
import { Router } from '@angular/router';
import { StyleService } from '../../../../services/style.service';



@Component({
  selector: 'app-measurement-style',
  templateUrl: './measurement-style.component.html',
  styleUrls: ['./measurement-style.component.css']
})
export class MeasurementStyleComponent implements OnInit {
  // @Input() data:any;

  constructor(
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router,
    private styleService:StyleService,
    @Inject(MAT_DIALOG_DATA) public data: {page: string, orderItemId: number, orderId: number}
    ) { }
  customerId: string;
  cartId: any;
  orderItemId: any;
  orderId: number;
  updateType: any;
  OrderId:any;
  form: any = {
    button: null,
    lapel: null,
    vent: null,
    pocket: null,
    jodhpuri: null,
    type: null,
    pleat: null,
    pocket_type: null,
    back_pocket: null,
    shape: null,
    cut_way: null,
    collar_type: null,
    placket: null,
    cuff_type: null,
    other: null,
    shape_type: null,
    fit_type: null,
    remark: null,
  };


  ngOnInit(): void {
    console.log('Order input data', this.data )
    this.cartId = this.route.snapshot.paramMap.get('cartId');
    this.customerId = this.authenticationService.getCustomerId();
  }

  onSubmit(): void {
    this.cartId = localStorage.getItem("cart_id");
    this.orderItemId = this.data?.orderItemId;
    this.updateType = this.data?.page;
    this.orderId = this.data?.orderId;
    const { button, lapel, vent, pocket, jodhpuri, type, pleat, pocket_type, back_pocket, shape, cut_way, collar_type, placket, cuff_type, other, shape_type, fit_type, remark} = this.form;
    this.styleService.storeStyles( this.customerId,this.cartId, this.orderItemId, this.orderId, this.updateType, button, lapel, vent, pocket, jodhpuri, type, pleat, pocket_type, back_pocket, shape, cut_way, collar_type, placket, cuff_type, other, shape_type, fit_type, remark).subscribe({
      next: data => {
        this.cancel();
        // console.log(data);return;
        if(data.success){
          this.commonService.openAlert(data.message);
          // this.router.navigate(['/cart']);
          // setTimeout(function(){
          //   window.location.reload();
          // }, 500);
        }else{
          this.commonService.openAlert(data.message);
        }
      },
      error: err => {

      }

    });

  }

  cancel():void{
    this.dialog.closeAll();
  }

}
