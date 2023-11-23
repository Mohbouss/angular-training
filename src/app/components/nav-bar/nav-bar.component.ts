import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddProductDialogComponent} from "../add-product-dialog/add-product-dialog.component";
import {ProductsService} from "../../service/products.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public dialog:MatDialog, private product:ProductsService, private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  addProduct(){
    let dialogRef=this.dialog.open(AddProductDialogComponent,{
      width:'500px',

      data:{}
    });
    dialogRef.afterClosed().subscribe(result=>{
     if(result){
      this.product.addProduct(result).subscribe((data)=>{
        console.log(data);
        this.toastr.success("product added successfully","success",{timeOut:3000});
        setTimeout(()=>{location.reload()},3000);
      }

      )
       console.log(result)
     }
     else{
       console.log("no data");
     }

    })
    }
  }

