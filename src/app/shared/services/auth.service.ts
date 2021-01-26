import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { AuthResponseModel } from 'src/app/shared/models/auth-response.model';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  public register(user: User): Observable<AuthResponseModel>{
    return this.http.post<AuthResponseModel>(`${BASE_URL}/users/register`, user);
  }

  public login(user: User): Observable<AuthResponseModel>{
    return this.http.post<AuthResponseModel>(`${BASE_URL}/login`, user);
  }
}
