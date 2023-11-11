import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UploadfileService {
  private apiUrl = "https://your-api-endpoint/upload"; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", file, file.name);

    const headers = new HttpHeaders();
    headers.append("Content-Type", "multipart/form-data");

    return this.http.post(this.apiUrl, formData, { headers });
  }
  readFromFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        resolve(event.target.result);
      };

      reader.onerror = (event) => {
        reject('Error reading file');
      };

      reader.readAsText(file);
    });
  }
}
