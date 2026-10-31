import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Subject {
  id: number;
  name: string;
  coefficient: number;
}

export interface StudentRecord {
  id?: number;
  firstName: string;
  lastName: string;
  gpa: number;
  detailedScores: { subjectName: string; coefficient: number; score: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://gpa-back-iw0fz3vh7-acme-ebc6.vercel.app/api';

  constructor(private http: HttpClient) {}

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${this.apiUrl}/subjects`);
  }

  calculateGpa(data: { firstName: string; lastName: string; scores: { [key: number]: number } }): Observable<StudentRecord> {
    return this.http.post<StudentRecord>(`${this.apiUrl}/calculate-gpa`, data);
  }

  getRecords(): Observable<StudentRecord[]> {
    return this.http.get<StudentRecord[]>(`${this.apiUrl}/records`);
  }
}