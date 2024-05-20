import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {jwtDecode, JwtPayload} from "jwt-decode";


interface Token{
  exp: number;
  user: {
    id: string;
  }

}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private api: string = 'http://notizapp24.s2110456016.student.kwmhgb.at/api/auth';

  constructor(private http: HttpClient) {
  }


  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  public setSessionStorage(token: string) {
    const decodedToken: Token = jwtDecode(token) as Token;
    console.log(decodedToken);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', decodedToken.user.id);
  }

  public getCurrentUserId(){
    return Number.parseInt(<string>sessionStorage.getItem("userId"));
  }

  public logout() {
    this.http.post(`${this.api}/logout`, {});
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
  }

  public isLoggedIn():boolean {
    if (sessionStorage.getItem('token')){
     let token:string = <string>sessionStorage.getItem('token');
     const decodedToken: Token = jwtDecode(token) as Token;
     let expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp); //gültig bis...
      if(expirationDate < new Date()){
        sessionStorage.removeItem('token');
        return false;
      }
      return true;
    }else{
      return false;
    }
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }
}
