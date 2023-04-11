import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';
import { ImageProcessingService } from './image-processing.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {

  constructor(private productService:ProductService, private imagePro:ImageProcessingService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<Product> {
    const id = Number(route.paramMap.get("productId"));
    if(id){
       return this.productService.getProductDetailsById(id)
       .pipe(
        map(p => this.imagePro.createImages(p))
       ) 
    }
    else{
       return of(this.getProductDetails());
    }
  }

  getProductDetails(){
    return {productName:"",
    productDescription:"",
    productDiscountedPrice:0,
    productActualPrice:0,
    productImages:[]
  }

  }
}
