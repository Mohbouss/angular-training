import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder,  FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent implements OnInit {
  myForm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialogRef<any> ,private fb: FormBuilder) {


  }

  ngOnInit(): void {


   this.myForm= this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      quantity: ['', Validators.required],
      available:[false,Validators.required],
      selected:[false,Validators.required]
    },


    );



      }
   get product(){
    return this.myForm.controls;
   }
  addProduct(){
    if(this.myForm.valid){
      this.dialog.close(this.myForm.value);

    }
  }

}
