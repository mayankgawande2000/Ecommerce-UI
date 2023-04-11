import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router){}

  register(form:NgForm){
this.userService.register(form.value).subscribe({
  next: (response)=>{
this.router.navigate(["/login"]);
  },
  error: (error)=>{

  }
});
  }

}
