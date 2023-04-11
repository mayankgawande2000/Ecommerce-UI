import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../service/user-auth.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private userService:UserService, private userAuthService:UserAuthService, private router:Router){}

  login(loginForm: NgForm){
    
     this.userService.login(loginForm.value).subscribe({
      next:(response: any)=>{
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        const role = response.user.role[0];
        if(role.roleName === 'Admin'){
          this.router.navigate(['/admin']);
        }
        else{
          this.router.navigate(['/user']);
        }
      },
      error:(error)=>{

      }
    });     
  }

  registerUser(){
    this.router.navigate(['/register']);
  }

}
