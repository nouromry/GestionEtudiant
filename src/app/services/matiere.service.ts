import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MatiereService {
  private baseUrl = 'http://localhost:8081/api/matieres'; 

  constructor(private http: HttpClient) {}

  getAllMatieres(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getMatiereById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  addMatiere(matiere: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, matiere);
  }

  updateMatiere(id: number, matiere: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, matiere);
  }

 
  deleteMatiere(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
