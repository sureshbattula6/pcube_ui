import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { OnlinepaymentService } from 'src/app/services/onlinepayment.service';

@Component({
  selector: 'app-online-payments',
  templateUrl: './online-payments.component.html',
  styleUrls: ['./online-payments.component.css']
})
export class OnlinePaymentsComponent implements OnInit {

  onlinepaymentForm: FormGroup = new FormGroup({
    name: new FormControl(),
    phone: new FormControl(),
    price:  new FormControl(),
    item_code: new FormControl(),
    order_id: new FormControl()
  });

  submitted = false;


  constructor(private formbuilder: FormBuilder,
    private onlinepaymentservice: OnlinepaymentService) {}

  ngOnInit(): void {
    this.onlinepaymentForm = this.formbuilder.group({
      name: ['',[Validators.required, Validators.pattern("^[a-zA-Z][a-zA-Z ]*$")]],
      phone: ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      price: ['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      item_code:[''],
      order_id:[''],
    })
  }

  get formvalidate() {
    return this.onlinepaymentForm.controls;
  }


  onlineFormSubmit(): void {
    this.submitted = true;

    if (this.onlinepaymentForm.invalid) {
      return;
    }
      if(this.onlinepaymentForm.valid){
        this.onlinepaymentservice.StoreOnlineoPyments(this.onlinepaymentForm.value)
        .subscribe({
          next:(res)=>{
            alert("Online Payments done Successfully");
            this.onlinepaymentForm.reset();
          },
          error:()=>{
            alert("Error while submitting Form")
          }
        })
      }
    }
  
  }

