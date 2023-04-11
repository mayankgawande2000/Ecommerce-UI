import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { MyOrderDetails } from '../../models/order.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  displayedColumns = ["Name","Address","Contact Number", "Amount", "Status"];
  myOrderDetails: MyOrderDetails[] = [];

  constructor(private productService: ProductService){}
  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails(){
    this.productService.getMyOrders().subscribe({
     next:(response: MyOrderDetails[])=>{
      this.myOrderDetails = response;
     },
     error:(error)=>{

     }
    })
  }

}
