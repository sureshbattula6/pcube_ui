import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public SERVER_PATH = environment.REST_API_URL;
  @Input() cart:any;
  @Input() product: any;
  @Output() productAdded = new EventEmitter();

  public productQuantity:number = 0;
  public productData:any[]=[];
  public qty: number = 0;

  addProductToCart(product) {

    this.productAdded.emit(product);
    this.productQuantity = +this.cart.quantities;
  }

  ngOnInit(){

  }

  increment() {
    this.qty += 1;
    this.sendCartQty();
  }

  decrement() {
    if (this.qty > 0)
      this.qty -= 1;
    else
      this.qty = 0;
      this.sendCartQty();
  }

  cartQty() {
    if (this.qty < 0)
      alert('Invalid Number');

      this.sendCartQty();
  }

  sendCartQty()
  {
    var item = {
      product: this.product.id,
      qty: this.qty
    }
    console.log(item);
    this.productAdded.emit(item);
  }
}
