import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../service/user-auth.service';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private userAuthService:UserAuthService, private router:Router, private userService:UserService){}
  
  public isLoggedIn():boolean{
    return this.userAuthService.isLoggedIn();
  }

  public logout(){
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }

  public roleMatch(roles:string[]):boolean{
    return this.userService.roleMatch(roles);
  }

  public isAdmin(): boolean{
    return this.userAuthService.isAdmin();
  }

  public isUser(): boolean{
    return this.userAuthService.isUser();
  }
}
