import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.scss']
})
export class ProductViewDetailsComponent implements OnInit  {
  selectedProductIndex: number = 0;
  product!: Product;
  constructor(private activatedRoute: ActivatedRoute, 
    private productService: ProductService,
    private router: Router){}
  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
   
  }
  changeIndex(i:number){
    this.selectedProductIndex=i;
  }
  buyProduct(productId:any){
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout: true,
      id: productId
    }
  ]);
  }
  addToCart(productId: any){
      this.productService.addToCart(productId).subscribe({
      next: (response: any)=>{

      },
      error: (error: any)=>{

      }
    }
      )
  }

}
