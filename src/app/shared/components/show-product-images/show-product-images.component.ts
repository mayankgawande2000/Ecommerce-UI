import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FileHandle } from '../../models/file-handle.model';

@Component({
  selector: 'app-show-product-images',
  templateUrl: './show-product-images.component.html',
  styleUrls: ['./show-product-images.component.scss']
})
export class ShowProductImagesComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(): void {
    this.receiveImages();
  }


  receiveImages(){

  }

}
