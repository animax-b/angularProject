import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Login } from '../models/login';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { UserSignup } from '../models/usersignup';
import { AUTH_ID } from '../app.constant';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpHeaders: HttpHeaders;
  user: User | undefined;
  constructor(private httpClient: HttpClient, private util: UtilService) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.GetUser();
  }
  ValidateUser(model: Login): Observable<HttpResponse<User>> {
    return this.httpClient.post<User>(environment.apiAddress + '/auth/validateuser', model, { headers: this.httpHeaders, observe: 'response' });
  }
  CreateUser(model: UserSignup): Observable<HttpResponse<User>> {
    return this.httpClient.post<User>(environment.apiAddress + '/auth/createuser', model, { headers: this.httpHeaders, observe: 'response' });
  }

  SetAuthUser(user: User) {
    const encUser = this.util.Encrypt(user);
    localStorage.setItem(AUTH_ID, encUser);
    this.user = user;
  }
  private GetUser() {
    const encData = localStorage.getItem(AUTH_ID);
    if (encData) {
      this.user = this.util.Decrypt(encData);
    }
    else {
      this.user = undefined;
    }
  }
  RemoveUser() {
    localStorage.removeItem(AUTH_ID);
    this.user = undefined;
  }
}
