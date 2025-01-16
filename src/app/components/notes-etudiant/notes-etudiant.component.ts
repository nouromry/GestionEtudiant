import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtudiantService } from '../../services/etudiant.service';
import { MatiereService } from '../../services/matiere.service';

@Component({
  selector: 'app-notes-etudiant',
  templateUrl: './notes-etudiant.component.html',
  styleUrls: ['./notes-etudiant.component.css']
})
export class NotesEtudiantComponent implements OnInit {
  notes: any[] = [];
  matieres: any[] = [];
  newNoteData = { ds: null, examen: null, coeficient: null, matiereId: null };
  etudiantId: number | null = null; 
  updateNoteData = { id: null, ds: null, examen: null, coeficient: null, matiereId: null };

  constructor(
    private route: ActivatedRoute,
    private etudiantService: EtudiantService,
    private matiereService: MatiereService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.etudiantId = +id; 
      this.fetchNotes();
    }
    this.fetchMatieres();
  }

  fetchNotes(): void {
    if (this.etudiantId !== null) {
      this.etudiantService.getNotesByEtudiantId(this.etudiantId).subscribe(
        (data) => (this.notes = data),
        (error) => console.error('Error fetching notes:', error)
      );
    }
  }

  fetchMatieres(): void {
    this.matiereService.getAllMatieres().subscribe(
      (data) => (this.matieres = data),
      (error) => console.error('Error fetching matieres:', error)
    );
  }

  addNote(): void {
    if (this.etudiantId !== null && this.newNoteData.matiereId !== null) {
      const notePayload = {
        ...this.newNoteData,
        etudiantId: this.etudiantId
      };

      this.etudiantService.saveNote(notePayload).subscribe(
        () => {
          this.fetchNotes();
          this.newNoteData = { ds: null, examen: null, coeficient: null, matiereId: null };
        },
        (error) => console.error('Error adding note:', error)
      );
    }
  }

  setUpdateNoteForm(note: any): void {
    this.updateNoteData = { 
      id: note.id, 
      ds: note.ds, 
      examen: note.examen, 
      coeficient: note.coeficient, 
      matiereId: note.matiere.id 
    };
  }

  updateNote(): void {
    if (this.updateNoteData.id !== null) {
      this.etudiantService.updateNote(this.updateNoteData.id, this.updateNoteData).subscribe(
        () => {
          this.fetchNotes();
          this.cancelUpdate();
        },
        (error) => console.error('Error updating note:', error)
      );
    }
  }

  cancelUpdate(): void {
    this.updateNoteData = { id: null, ds: null, examen: null, coeficient: null, matiereId: null };
  }
}
