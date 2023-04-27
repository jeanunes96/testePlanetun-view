import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import LoginResponse from '../models/LoginResponse';
import User from '../models/User';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authApiUrl = 'https://localhost:44387/api/User/login'

  constructor(private http: HttpClient) { }

  login(login : string, password: string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.authApiUrl, {login, password})
    .pipe(
      tap({
        next: p => this.setToken(p.token)
      })
    );
  }

  ifLoggedIn(){
    return localStorage.getItem('token') != null
  }
  
  logout(){
    localStorage.removeItem('token')
  }

  private setToken(token: string){
    localStorage.setItem('token', token)
  }

}
