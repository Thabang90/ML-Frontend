import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private baseUrl: string = "https://localhost:7189/api/user/";
  constructor(private http: HttpClient) { }

  sendResetPasswordLink(email: string) {
    return this.http.post<any>(`${this.baseUrl}send-reset-email/${email}`,{});
  }

  resetPassword(resetPasswordModel: any){
    return this.http.post<any>(`${this.baseUrl}reset-password`, resetPasswordModel);
  }
}
