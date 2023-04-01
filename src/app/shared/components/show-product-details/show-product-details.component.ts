import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from '../../models/product.model';
import { ImageProcessingService } from '../../service/image-processing.service';
import { ProductService } from '../../service/product.service';
import { ShowProductImagesComponent } from '../show-product-images/show-product-images.component';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.scss']
})
export class ShowProductDetailsComponent implements OnInit{
   productDetails: Product[]=[];
  displayedColumns: string[] = ['Id', 'Product Name', 'Product Description', 'Product Discounter price','Product Actual price','Images', 'Edit', 'Delete'];
  constructor(private productService: ProductService, 
    private imagePro:ImageProcessingService,
    public dialog: MatDialog,
    private router: Router){}

  ngOnInit(): void{
  this.getAllProducts();
  }

  public getAllProducts(){
    this.productService.getAllProducts().pipe(
      map((x:Product[],i:number) => x.map((product: Product)=> this.imagePro.createImages(product)))
    ).subscribe({
      next:(response)=>{
         this.productDetails = response;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }


  deleteProduct(id: number){
    this.productService.deleteProduct(id).subscribe({
      next: (res)=>{
        this.getAllProducts();

      },
      error:(err: HttpErrorResponse)=>{
   console.log(err);
      }
      
  })
  }

  showImages(product: Product){
    this.dialog.open(ShowProductImagesComponent, {
      height: '500px',
      width: '500px',
      data: {
        images: product.productImages,
      }
    });
  }

  editProductDetails(id:number){
    this.router.navigate(['/addNewProduct',{productid:id}]);
  }
}
