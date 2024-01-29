import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-item-status-view',
  templateUrl: './item-status-view.component.html',
  styleUrls: ['./item-status-view.component.css']
})
export class ItemStatusViewComponent implements OnInit {

  public statuses: any
  public orderItemId: any;
  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
  ) {
      this.orderItemId = data.id;
   }

  ngOnInit(): void {
    this.productService.getOrderItemStatuses(this.orderItemId).subscribe(
      (res) => {
        this.statuses = res;
      },
      (err) => {
        console.log('Error', err);
      }
    )
  }

  cancel():void{
    this.dialog.closeAll();
  }
  
}
