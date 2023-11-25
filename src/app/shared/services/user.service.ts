import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string ="/api/user/";
  constructor(private http: HttpClient) { }

  
  upsertUser(user: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const options = { headers: headers };
    return this.http.post<any>(`${this.baseUrl}upsert`, user, {headers});
  }

  getUsers(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const options = { headers: headers };
    return this.http.get<any>(`${this.baseUrl}users`, {headers});
  }

  deleteUser(userId: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const options = { headers: headers };
    return this.http.post<any>(`${this.baseUrl}delete/${userId}`, {headers});
  }
}
