import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit{
  message:string ='';
  constructor(private userService:UserService){}
  ngOnInit(): void {
    this.forUser();
  }
  forUser(){
    this.userService.forUser().subscribe({
      next:(response)=>{
  
        this.message = response;
      },
      error:(err)=>{

      }
    })
  }

}
