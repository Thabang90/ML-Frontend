import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private baseUrl: string = "https://localhost:7189/api/question/";
  constructor(private http: HttpClient) { }

  addQuestion(question: any) {
    return this.http.post<any>(`${this.baseUrl}add`, question);
  }

  getQuestions() {
    return this.http.get<any>(`${this.baseUrl}questions`);
  }

  deleteQuestion(questionId: number) {
    return this.http.post<any>(`${this.baseUrl}delete/${questionId}`, {});
  }

  updateQuestion(question: any){
    return this.http.post<any>(`${this.baseUrl}update`, question);
  }
}
