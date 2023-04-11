import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { OrderDetails } from '../models/order-details.model';
import { MyOrderDetails } from '../models/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  public addProduct(product: FormData){
    return this.http.post<Product>("http://localhost:9090/addNewProduct",product);
  }

  public getAllProducts(pageNumber:any, searchKeyword: string =""){
    return this.http.get<Product[]>("http://localhost:9090/getAllProducts?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

  public deleteProduct(id: number){
    return this.http.delete("http://localhost:9090/deleteProductDetails/"+id);
  }

  public getProductDetailsById(id:number){
    return this.http.get<Product>("http://localhost:9090/getProductDetailsById/"+id);
  }

  public getProductDetails(isSingleProductCheckout:any, productId:any){
    return this.http.get<Product[]>("http://localhost:9090/getProductDetails/"+isSingleProductCheckout+"/"+productId);
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout: any){
    return this.http.post("http://localhost:9090/placeOrder/"+isCartCheckout,orderDetails);
  }

  public addToCart(productId: any){
    return this.http.get("http://localhost:9090/addToCart/"+productId);
  }

  public getCartDetails(){
    return this.http.get("http://localhost:9090/getCartDetails");
  }

  public deleteCartItem(cartId: any){
    return this.http.delete("http://localhost:9090/deleteCartItem/"+cartId);
  }

  public getMyOrders(): Observable<MyOrderDetails[]>{
    return this.http.get<MyOrderDetails[]>("http://localhost:9090/getOrderDetails");
  }

  public getAllOrderDetailsForAdmin(status:string): Observable<MyOrderDetails[]>{
    return this.http.get<MyOrderDetails[]>("http://localhost:9090/getAllOrderDetails/"+status);
  }

  public markAsDelivered(orderId: any){
    return this.http.get("http://localhost:9090/markOrderAsDelivered/"+orderId);
  }
}
