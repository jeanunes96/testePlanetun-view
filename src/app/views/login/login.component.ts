import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service ';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent {
  login!: string;
  password!: string;
  message!: string;

  constructor( private authService: AuthService, private router: Router){
  }

  enter(login: string, password: string){
    this.authService.login(login,password)
    .pipe(catchError((error: HttpErrorResponse) => {
      if(error.status == 401)
      this.message == 'Usuário ou senha inválidos'
      
      return throwError(() => error)
    }))
    .subscribe(() => this.router.navigate(['/inspections']))
  }
}
