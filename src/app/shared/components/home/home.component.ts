import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { map } from 'rxjs';
import { Product } from '../../models/product.model';
import { ImageProcessingService } from '../../service/image-processing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  productDetails:any[] = [];
  pageNumber: number = 0;
  showLoadButton: boolean = false;
  constructor(private productService:ProductService,
    private imagePro:ImageProcessingService,
    private router: Router){}
  ngOnInit(): void {
    this.getAllProducts(); 
  }
  public getAllProducts(searchKey: string =""){
    this.productService.getAllProducts(this.pageNumber, searchKey).pipe(
      map((x:Product[],i:number) => x.map((product: Product)=> this.imagePro.createImages(product)))
    ).subscribe({
      next:(response)=>{
        if(response.length == 12){
          this.showLoadButton =true;
        }
        else{
          this.showLoadButton = false;
        }
        response.forEach(p=> this.productDetails.push(p));
        //  this.productDetails = response;
      },
      error:(err)=>{

      }
    })
  }

  showProductDetails(id: any){
 this.router.navigate(['productViewDetails',{productId: id}]);
  }

  loadMoreProduct(){
    this.pageNumber++;
    this.getAllProducts();
  }

  searchByKeyword(searchKeyword: string){
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchKeyword);
  }

}
