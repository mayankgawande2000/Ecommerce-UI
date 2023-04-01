import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles:[]){
    localStorage.setItem("roles",JSON.stringify(roles));
  }

  public getRoles(): []{
    let roles = localStorage.getItem('roles');
    return roles?JSON.parse(roles):[];
  }

  public setToken(jwtToken: string){
    localStorage.setItem("jwtToken",jwtToken);
  }

  public getToken(): string{
    let token = localStorage.getItem("jwtToken");
    return token?token:'';
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(): boolean{
    return (this.getRoles().length >0 && this.getToken().length>0);
  }

  public isAdmin():boolean{
   const roles:any[] = this.getRoles();
   return roles[0].roleName === 'Admin';
  }
  public isUser():boolean{
    const roles:any[] = this.getRoles();
    return roles[0].roleName === 'User';
   }
}
