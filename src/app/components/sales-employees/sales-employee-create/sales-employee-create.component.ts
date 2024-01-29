import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesService } from '../../../services/roles.service';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { CURRENT_PAGE, GET_ALL } from 'src/app/shared/constants/pagination.contacts';
import {map, startWith} from 'rxjs/operators';
import { UsersService } from '../../../services/users.service';
import { CommonService } from '../../../services/common.service';
import { SalesemployeeService } from 'src/app/services/salesemployee.service';
@Component({
  selector: 'app-sales-employee-create',
  templateUrl: './sales-employee-create.component.html',
  styleUrls: ['./sales-employee-create.component.css']
})
export class SalesEmployeeCreateComponent implements OnInit {

/** USING THIS TO RESET FORM  WITH OUT SHOWING FORMVALIDAITON ERRORS**/
@ViewChild('myForm', {static: false}) myForm: NgForm;
public SalesForm:FormGroup;

public userId:number = undefined;

public btnText:string = "Create";


public sales:any;
public page_length:number = GET_ALL;
public current_page:number = CURRENT_PAGE;
public roles: any;
public user:any;



constructor(private dialog: MatDialog,
  private commonService: CommonService,
  private fb:FormBuilder,
  private rolesService:RolesService,
  private salesemployeeservice: SalesemployeeService,
  @Inject(MAT_DIALOG_DATA) public data: any,) { 
    this.userId = data.id;
  }

  name!: string
  // email!: string
  // password!: string
  errors: any=[];

ngOnInit(): void {
  this.createSalesForm();
  // this.getRoles(this.current_page, this.page_length);
  this.getUserDetails();
}

getUserDetails():void{
  if(this.userId != undefined){
    this.btnText = "Update";
    this.salesemployeeservice.showSalesemployee(this.userId).subscribe(
      (res:any) => {
        this.roles = res.data.roles;
        this.user = res.data.user;
          this.SalesForm.patchValue({
              name: this.user.name,
              employe_code: this.user.employe_code,
              phone: this.user.phone,
              // email: this.sales.email,
              // password: this.sales.password,
          });
      }
    );
  }
}

createSalesForm(){
  this.SalesForm = this.fb.group({
    name: ['',[Validators.required]],
    employe_code: ['',[Validators.required]],
    // phone: ['',[Validators.required]],
    phone: [''],
    // email: ['', [Validators.required,Validators.email]],
    // email:[''],
    // password: ['',[Validators.required]],
  })
}

get formValidate(){
  return this.SalesForm.controls;
}

salesFormSubmit(){
  
  if(this.SalesForm.invalid){
    return;
  }

  if(this.userId == undefined){
    console.log(this.SalesForm.value);
    this.salesemployeeservice.storeSales(this.SalesForm.value).subscribe(
      (response)=>{
          this.SalesForm.reset();
          this.myForm.resetForm();
          this.commonService.openAlert(response.message); 
          this.cancel(); 
      },
      (err)=>{ 

          if (err instanceof HttpErrorResponse) {
            if(err.status === 422) {
              const validatonErrors = err.error.errors;
              Object.keys(validatonErrors).forEach( prop => {
                const formControl = this.SalesForm.get(prop);
                if(formControl){
                  formControl.setErrors({
                    serverError: validatonErrors[prop]
                  });
                }
              });
            }
          }
      }
    )

  }else{
   
    this.salesemployeeservice.updateSalesEmployee(this.userId,this.SalesForm.value).subscribe(
      (response)=>{
          this.commonService.openAlert(response.message); 
          this.cancel();
      },
      (err)=>{ 
          if (err instanceof HttpErrorResponse) {
            if(err.status === 422) {
              const validatonErrors = err.error.errors;
              Object.keys(validatonErrors).forEach( prop => {
                const formControl = this.SalesForm.get(prop);
                if(formControl){
                  formControl.setErrors({
                    serverError: validatonErrors[prop]
                  });
                }
              });
            }
          }
      }
    )
  }
}






cancel():void{
  this.dialog.closeAll();
}



}

