import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesService } from '../../../services/roles.service';
import { HttpParams, HttpErrorResponse } from '@angular/common/http';
import { CURRENT_PAGE, GET_ALL } from 'src/app/shared/constants/pagination.contacts';
import {map, startWith} from 'rxjs/operators';
import { UsersService } from '../../../services/users.service';
import { CommonService } from '../../../services/common.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

/** USING THIS TO RESET FORM  WITH OUT SHOWING FORMVALIDAITON ERRORS**/
@ViewChild('myForm', {static: false}) myForm: NgForm;
public CategoryForm:FormGroup;

public userId:number = undefined;

public btnText:string = "Create";


public category:any;
public page_length:number = GET_ALL;
public current_page:number = CURRENT_PAGE;
public roles: any;
public user:any;



constructor(private dialog: MatDialog,
  private commonService: CommonService,
  private fb:FormBuilder,
  private rolesService:RolesService,
  private categoryservice: CategoryService,
  @Inject(MAT_DIALOG_DATA) public data: any,) { 
    this.userId = data.id;
  }

  name!: string
  errors: any=[];

ngOnInit(): void {
  this.createCategoryForm();
  // this.getRoles(this.current_page, this.page_length);
  this.getUserDetails();
}

getUserDetails():void{
  if(this.userId != undefined){
    this.btnText = "Update";
    this.categoryservice.categoryShow(this.userId).subscribe(
      (res:any) => {
        this.roles = res.data.roles;
        this.user = res.data.user;
          this.CategoryForm.patchValue({
              name: this.user.name,
             
          });
      }
    );
  }
}

createCategoryForm(){
  this.CategoryForm = this.fb.group({
    name: ['',[Validators.required]],   
  })
}

get formValidate(){
  return this.CategoryForm.controls;
}

categoryFormSubmit(){
  
  if(this.CategoryForm.invalid){
    return;
  }

  if(this.userId == undefined){
    console.log(this.CategoryForm.value);
    this.categoryservice.categoryStore(this.CategoryForm.value).subscribe(
      (response)=>{
          this.CategoryForm.reset();
          this.myForm.resetForm();
          this.commonService.openAlert(response.message); 
          this.cancel(); 
      },
      (err)=>{ 

          if (err instanceof HttpErrorResponse) {
            if(err.status === 422) {
              const validatonErrors = err.error.errors;
              Object.keys(validatonErrors).forEach( prop => {
                const formControl = this.CategoryForm.get(prop);
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
   
    this.categoryservice.updatecategory(this.userId,this.CategoryForm.value).subscribe(
      (response)=>{
          this.commonService.openAlert(response.message); 
          this.cancel();
      },
      (err)=>{ 
          if (err instanceof HttpErrorResponse) {
            if(err.status === 422) {
              const validatonErrors = err.error.errors;
              Object.keys(validatonErrors).forEach( prop => {
                const formControl = this.CategoryForm.get(prop);
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
