import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import {Observable} from 'rxjs';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  public register(user: User): Observable<any>{
    return this.http.post(`${BASE_URL}/users/register`, user);
  }

  public login(user: User): Observable<any>{
    return this.http.post(`${BASE_URL}/login`, user);
  }
}
