import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Product} from "../model/product";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  url:string="http://localhost:3000/products";
  getProducts():Observable<Product[]>{
    return this.http.get(this.url) as Observable<Product[]>;

  }
  getSelectedProducts():Observable<Product[]>{
    return this.http.get(this.url+"?selected=true") as Observable<Product[]>;
  }
  getAvailableProducts():Observable<Product[]>{
    return this.http.get(this.url+"?available=true") as Observable<Product[]>;
  }
  searchProducts(keyword:string):Observable<Product[]>{
    return this.http.get(this.url+"?name_like="+keyword) as Observable<Product[]>;

  }
  selectProduct(product:Product):Observable<Product>{
    product.selected=!product.selected;
    return this.http.put(this.url+"/"+product.id,product) as Observable<Product>;
  }
deleteProduct(product:Product){
     return this.http.delete(this.url+"/"+product.id) as Observable<Product>;
}
addProduct(product:Product):Observable<Product>{
    return this.http.post(this.url,product) as Observable<Product>;
}

}
