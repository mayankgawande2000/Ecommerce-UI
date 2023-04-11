import { Component, OnInit } from '@angular/core';
import { MyOrderDetails } from '../../models/order.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit{

orderDetails: MyOrderDetails[] = [];
status: string = 'All';
  displayedColumns = ["Id","Product Name","Name","Address","Contact Number", "Status", 'Actions'];
  constructor(private productService: ProductService){}
  ngOnInit(): void {
    this.getOrderDetails(this.status);
  }

  getOrderDetails(status: string){
    this.productService.getAllOrderDetailsForAdmin(status).subscribe({
     next:(response: MyOrderDetails[])=>{
      this.orderDetails = response;
     },
     error:(error)=>{

     }
    })
  }

  markAsDelivered(element: any){

    this.productService.markAsDelivered(element).subscribe({
      next: (res)=>{
        this.getOrderDetails(this.status);
      },
      error:(error)=>{

      }
    })

  }

}
