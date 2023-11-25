import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MlService {
  
  private baseUrl: string = "/api_ml/";

  constructor(private http: HttpClient) { }

  login(user: any) {
    // Define headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    // Define options with headers
    const options = { headers: headers };

    // Make HTTP request with headers
    return this.http.post<any>(`${this.baseUrl}extract-questions`, user, options);
  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    const headers = new HttpHeaders();
    // headers.append('Authorization', 'Bearer your_token'); // Include authentication headers if needed

    return this.http.post<any>(`${this.baseUrl}extract-questions`, formData, { headers });
  }
}
