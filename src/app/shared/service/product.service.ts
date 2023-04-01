import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  public addProduct(product: FormData){
    return this.http.post<Product>("http://localhost:9090/addNewProduct",product);
  }

  public getAllProducts(){
    return this.http.get<Product[]>("http://localhost:9090/getAllProducts");
  }

  public deleteProduct(id: number){
    return this.http.delete("http://localhost:9090/deleteProductDetails/"+id);
  }

  public getProductDetailsById(id:number){
    return this.http.get<Product>("http://localhost:9090/getProductDetailsById/"+id);
  }
}
