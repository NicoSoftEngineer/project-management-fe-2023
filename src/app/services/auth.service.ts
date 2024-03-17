import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginModel } from '../models/login.interface';
import { Observable } from 'rxjs';
import { RegisterModel } from '../models/register.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  protected readonly httpClient = inject(HttpClient);

  protected readonly baseUrl = '/api/v1/Auth';

  login(data: LoginModel): Observable<undefined> {
    const url = this.baseUrl + '/Login';
    return this.httpClient.post<undefined>(url, data);
  }

  register(data: RegisterModel): Observable<string> {
    const url = this.baseUrl + '/Register';
    return this.httpClient.post<string>(url, data);
  }

  logout(): Observable<string> {
    const url = this.baseUrl + '/Logout';
    return this.httpClient.post<string>(url, {});
  }

  validateToken(token: string, email: string): Observable<undefined> {
    const url = this.baseUrl + '/ValidateToken';
    return this.httpClient.post<undefined>(url, {}, { params: new HttpParams({
      fromObject: {
        email, token
      }
    })});
  }

  userinfo(): Observable<string> {
    const url = this.baseUrl + '/UserInfo';
    return this.httpClient.get(url, { responseType: 'text'});
  }

}
