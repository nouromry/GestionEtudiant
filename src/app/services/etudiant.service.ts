import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  private readonly baseApiUrl = 'http://localhost:8081/api/etudiants';
  private readonly noteApiUrl = 'http://localhost:8081/api/notes';
  private readonly absenceApiUrl = 'http://localhost:8081/api/absences';

  constructor(private http: HttpClient) {}

  getEtudiants(): Observable<any> {
    return this.http.get<any[]>(this.baseApiUrl).pipe(
        catchError(error => {
            console.error('Error fetching students:', error);
            return throwError(() => new Error('Unable to fetch students.'));
        })
    );
}
 getNotes(): Observable<any[]> {
    return this.http.get<any[]>(this.noteApiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching notes:', error);
        return throwError(() => new Error('Unable to fetch notes.'));
      })
    );
  }
  getEtudiantById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseApiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching student with ID ${id}:`, error);
        return throwError(() => new Error(`Unable to fetch student with ID ${id}.`));
      })
    );
  }

  
   getNotesByEtudiantId(id: number): Observable<any[]> {
   
    return this.http.get<any[]>(`${this.noteApiUrl}/etudiant/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching notes for student ID ${id}:`, error);
        return throwError(() => new Error(`Unable to fetch notes for student ID ${id}.`));
      })
    );
  }


  getAbsencesByEtudiantId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.absenceApiUrl}/etudiant/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching absences for student ID ${id}:`, error.message);
        return throwError(() => new Error(`Unable to fetch absences for student ID ${id}.`));
      })
    );
  }

  saveNote(note: any): Observable<any> {
    const params = {
      etudiantId: note.etudiantId, 
      matiereId: note.matiereId     
    };
    
    return this.http.post<any>(`${this.noteApiUrl}`, note, { params }).pipe(
      catchError((error) => {
        console.error('Error saving note:', error);
        return throwError(() => new Error('Unable to save note.'));
      })
    );
  }
  

  // Delete a note by its ID
  deleteNoteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.noteApiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error deleting note with ID ${id}:`, error);
        return throwError(() => new Error(`Unable to delete note with ID ${id}.`));
      })
    );
  }

  saveAbsence(absence: any): Observable<any> {
    const params = {
      etudiantId: absence.etudiantId, 
      matiereId: absence.matiereId 
    };
  
    return this.http.post<any>(`${this.absenceApiUrl}`, absence, { params }).pipe(
      catchError((error) => {
        console.error('Error saving absence:', error);
        return throwError(() => new Error('Unable to save absence.'));
      })
    );
  }
  updateAbsence(id: number, absence: any): Observable<any> {
    return this.http.put<any>(`${this.absenceApiUrl}/${id}`, absence).pipe(
      catchError((error) => {
        console.error(`Error updating absence with ID ${id}:`, error);
        return throwError(() => new Error(`Unable to update absence with ID ${id}.`));
      })
    );
  }
  

  deleteAbsenceById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.absenceApiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error deleting absence with ID ${id}:`, error);
        return throwError(() => new Error(`Unable to delete absence with ID ${id}.`));
      })
    );
  }
  
  updateEtudiant(id: number, etudiant: any): Observable<any> {
    return this.http.put<any>(`${this.baseApiUrl}/${id}`, etudiant);
  }
  
  createEtudiant(etudiant: any): Observable<any> {
    return this.http.post<any>(`${this.baseApiUrl}`, etudiant);
  }

updateNote(id: number, note: any): Observable<any> {
  return this.http.put<any>(`${this.noteApiUrl}/${id}`, note).pipe(
    catchError((error) => {
      console.error(`Error updating note with ID ${id}:`, error);
      return throwError(() => new Error(`Unable to update note with ID ${id}.`));
    })
  );
}

}
