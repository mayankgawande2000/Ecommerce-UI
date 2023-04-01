import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { FileHandle } from '../../models/file-handle.model';
import { Product } from '../../models/product.model';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent implements OnInit{
  isNewProduct:boolean = true;
  product: Product = {
    productName:"",
    productDescription:"",
    productDiscountedPrice:0,
    productActualPrice:0,
    productImages:[]
  }
  constructor(private productService:ProductService,
    private sanitizer:DomSanitizer,
    private activatedRoute: ActivatedRoute){}

    ngOnInit(){
      console.log(this.activatedRoute.snapshot.data);
       this.product = this.activatedRoute.snapshot.data['product'];
     if(this.product && this.product.productId){
      this.isNewProduct=false;
     }
    }

  addProduct(productForm:NgForm){
    const productformData = this.prepareFormData(this.product);
   this.productService.addProduct(productformData).subscribe({
    next:(response)=>{
    productForm.reset();
    this.product.productImages=[];
    },
    error:(err: HttpErrorResponse)=>{

    }
   })
  }

  prepareFormData(product: Product): FormData {
  const formData = new FormData();
   formData.append(
    'product',
    new Blob([JSON.stringify(product)],{type: 'application/json'})
   );
  for(var i=0; i<product.productImages.length; i++){
    formData.append(
      'imageFile',
      product.productImages[i].file,
      product.productImages[i].file.name
    )
  }
  return formData;
  }

  onFileSelected(event: any){
  if(event.target.files){
   const file =  event.target.files[0];
   const filehandle:FileHandle ={
    file:file,
    url: this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(file)
    )
   }
   this.product.productImages.push(filehandle);
  }
  }

  removeImages(index: number){
    this.product.productImages.splice(index,1);
  }

  fileDropped(filehandle: FileHandle){
    this.product.productImages.push(filehandle);

  }

}
