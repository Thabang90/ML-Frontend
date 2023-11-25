import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private baseUrl: string ="/api/user/";
  constructor(private http: HttpClient) { }

  login(user: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, user);
  }
}
