import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private baseUrl: string ="http://thabang90-001-site1.atempurl.com/api/user/";
  constructor(private http: HttpClient) { }

  login(user: any) {
    return this.http.post<any>(`${this.baseUrl}authenticate`, user);
  }
}
