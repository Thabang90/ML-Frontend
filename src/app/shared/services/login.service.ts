import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private baseUrl: string ="http://thabang90-001-site1.atempurl.com";
  constructor(private http: HttpClient) { }

  login(user: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const options = { headers: headers };
    return this.http.post<any>(`${this.baseUrl}/api/user/authenticate`, user,{ headers });
  }
}