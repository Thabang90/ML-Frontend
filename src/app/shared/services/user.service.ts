import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string ="http://thabang90-001-site1.atempurl.com/api/user/";
  constructor(private http: HttpClient) { }

  
  upsertUser(user: any){
    return this.http.post<any>(`${this.baseUrl}upsert`, user);
  }

  getUsers(){
    return this.http.get<any>(`${this.baseUrl}users`);
  }

  deleteUser(userId: number) {
    return this.http.post<any>(`${this.baseUrl}delete/${userId}`, {});
  }
}
