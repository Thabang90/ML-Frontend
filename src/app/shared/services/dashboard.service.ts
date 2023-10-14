import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl: string = "https://localhost:7189/api/user/";
  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<any>(`${this.baseUrl}users`);
  }
}
