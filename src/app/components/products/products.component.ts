import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../service/products.service";
import {Product} from "../../model/product";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmationComponent} from "../../delete-confirmation/delete-confirmation.component";
import {AddProductDialogComponent} from "../add-product-dialog/add-product-dialog.component";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  Products:Product[]=null ;
  availableMenuContent:string='All Available';
  selectedMenuContent:string='All Selected';
  dispalyedProducts:Product[]=null;
  keyword:string='';

  constructor(private product:ProductsService ,public dialog:MatDialog) { }

  ngOnInit(): void {
  this.product.getProducts().subscribe((data)=>{
  this.Products=data;
  this.getAllProducts();
  }
  )

  }

  getAllProducts(){
    this.dispalyedProducts=this.Products;

  }

getAvailableProducts(state){
    this.availableMenuContent=state;
    this.UpdateDisplayProducts();
    this.searchProduct();
}
getSelectedProducts(state){
  this.selectedMenuContent=state;
  this.UpdateDisplayProducts();
  this.searchProduct();
}
UpdateDisplayProducts(){

   this.dispalyedProducts=this.Products
   if (this.availableMenuContent !== "All Available")
   this.dispalyedProducts = this.dispalyedProducts.filter(x => x.available == (this.availableMenuContent === 'Available'))

  if(this.selectedMenuContent!=='All Selected' )
    this.dispalyedProducts = this.dispalyedProducts.filter(x => x.selected == (this.selectedMenuContent === 'Selected'))

  this.searchProduct();

}

  searchProduct(){
    if(this.keyword!=='') {
      this.dispalyedProducts = this.dispalyedProducts.filter((product) => product.name.toLowerCase().includes(this.keyword.toLowerCase()))    }
  }
  selectProduct(product:Product){
    this.product.selectProduct(product).subscribe((data)=>{
      product.selected=data.selected;
      this.UpdateDisplayProducts();
    })
  }
  deleteProduct(product:Product){
    this.dialog.open(DeleteConfirmationComponent,{
      width:'500px',
      data:{}
    }).afterClosed().subscribe(result=>{
      if(result){
        this.product.deleteProduct(product).subscribe((data)=>{
          this.Products.splice(this.Products.indexOf(product),1);
          this.getAllProducts();
        })
      }
      }
    )
    }

    }


