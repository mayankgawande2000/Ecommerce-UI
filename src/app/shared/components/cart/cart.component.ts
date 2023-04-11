import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  displayedColumns: string[] = ['Name','Description','Price', 'Discounted Price','Action'];
  cartDetails: any = [];
  constructor(private productService: ProductService,
    private router: Router){}

  ngOnInit(): void {
    this.getCartDetails();
  }

  getCartDetails(){
    this.productService.getCartDetails().subscribe({
      next: (response)=>{
       this.cartDetails = response;
      },
      error: (error)=>{

      }
    })
  }

  checkout(){
    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout: false,
      id: 0
    }
  ]);
  }

  delete(cartId:any){
    console.log(cartId);
    this.productService.deleteCartItem(cartId).subscribe(
      {
        next: (response)=>{
          this.getCartDetails();

        },
        error:(error)=>{

        }
      }
    )

  }

}
