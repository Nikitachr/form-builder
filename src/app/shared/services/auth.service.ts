import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from 'src/app/shared/models/user.model';
import { AuthResponse } from 'src/app/shared/models/authResponse.model';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  public register(user: User): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${BASE_URL}/users/register`, user);
  }

  public login(user: User): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${BASE_URL}/login`, user);
  }
}
