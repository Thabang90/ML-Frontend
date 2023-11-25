import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private baseUrl: string ="http://thabang90-001-site1.atempurl.com/api/user/";
  constructor(private http: HttpClient) { }

  sendResetPasswordLink(email: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const options = { headers: headers };
    return this.http.post<any>(`${this.baseUrl}send-reset-email/${email}`,{headers});
  }

  resetPassword(resetPasswordModel: any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const options = { headers: headers };
    return this.http.post<any>(`${this.baseUrl}reset-password`, resetPasswordModel, {headers});
  }
}
