import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../../models/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { OrderProductQuantity } from '../../models/order-quantity.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.scss']
})
export class BuyProductComponent implements OnInit {

  productDetails: Product[] = [];

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  }
  isSingleProductCheckout!: string | null;
  constructor(private activatedRoute: ActivatedRoute, 
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'] ? this.activatedRoute.snapshot.data['productDetails'] : [];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout")
    this.productDetails.forEach((x: Product) => {
      if (x.productId) {
        this.orderDetails.orderProductQuantityList.push(
          { 
            productId: x.productId,
            quantity: 1
          }
        );
      }
    }
    )
  }


  public placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails,this.isSingleProductCheckout ).subscribe({
      next:(response)=>{
        this.router.navigate(['/orderConfirm']);
        orderForm.reset();
      },
      error:(error)=>{

      }
    })

  }

  getQuantityForProduct(productId: any){
     const filteredProduct = this.orderDetails.orderProductQuantityList.filter(
      (productQuantity)=> productQuantity.productId === productId
     );
     return filteredProduct[0].quantity;
  }

  getCalculateTotal(productId: any, discountedPrice:any){
    return this.getQuantityForProduct(productId)*discountedPrice;
  }

  onQuantityChange(value: any, productId: any){
    this.orderDetails.orderProductQuantityList.filter(
      (orderProduct)=>orderProduct.productId === productId
    )[0].quantity = value;
  }

  getCalculatedGrandTotal(){
    let grandTotal = 0;
    this.orderDetails.orderProductQuantityList.forEach(
      (productQuantity)=>{
        const price = this.productDetails.filter(product => product.productId=== productQuantity.productId)[0].productDiscountedPrice
       grandTotal= grandTotal+ price*productQuantity.quantity;
      }
        )

        return grandTotal;
      }
    
  }


