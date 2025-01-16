import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtudiantService } from '../../services/etudiant.service';
import { MatiereService } from '../../services/matiere.service';

@Component({
  selector: 'app-absences-etudiant',
  templateUrl: './absences-etudiant.component.html',
  styleUrls: ['./absences-etudiant.component.css'],
})
export class AbsencesEtudiantComponent implements OnInit {
  absences: any[] = [];
  matieres: any[] = [];
  filteredAbsences: any[] = []; // Holds filtered absences
  eliminated = false;
  newAbsence = { matiereId: null, date: '', justifiee: false };
  updateAbsenceData = { id: null, matiereId: null, date: '', justifiee: false };
  etudiantId: number | null = null;
  searchDate: string = ''; // Holds search date input

  constructor(
    private route: ActivatedRoute,
    private etudiantService: EtudiantService,
    private matiereService: MatiereService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.etudiantId = +id;
      this.fetchAbsences();
    }
    this.fetchMatieres();
  }

  fetchAbsences(): void {
    if (this.etudiantId !== null) {
      this.etudiantService.getAbsencesByEtudiantId(this.etudiantId).subscribe(
        (data) => {
          this.absences = data;
          this.filterAbsences(); // Apply filter after fetching absences
          const absenceCounts = this.absences.reduce(
            (counts: Record<string, number>, absence: any) => {
              counts[absence.matiere] = (counts[absence.matiere] || 0) + 1;
              return counts;
            },
            {}
          );
          this.eliminated = Object.values(absenceCounts).some((count) => count > 6);
        },
        (error) => {
          console.error('Error fetching absences:', error);
        }
      );
    }
  }

  fetchMatieres(): void {
    this.matiereService.getAllMatieres().subscribe(
      (data) => {
        this.matieres = data;
      },
      (error) => {
        console.error('Error fetching matieres:', error);
      }
    );
  }

  // Function to filter absences based on the search date
  filterAbsences(): void {
    if (this.searchDate) {
      this.filteredAbsences = this.absences.filter((absence) =>
        absence.date.includes(this.searchDate)
      );
    } else {
      this.filteredAbsences = [...this.absences]; // Show all if no search date
    }
  }

  addAbsence(): void {
    if (this.etudiantId !== null && this.newAbsence.matiereId && this.newAbsence.date) {
      const absencePayload = {
        matiereId: this.newAbsence.matiereId,
        etudiantId: this.etudiantId,
        date: this.newAbsence.date,
        justifiee: this.newAbsence.justifiee,
      };

      this.etudiantService.saveAbsence(absencePayload).subscribe(
        (data) => {
          console.log('Absence added:', data);
          this.newAbsence = { matiereId: null, date: '', justifiee: false };
          this.fetchAbsences();
        },
        (error) => {
          console.error('Error adding absence:', error);
        }
      );
    }
  }

  isEditing = false;

  setUpdateAbsenceForm(absence: any): void {
    this.isEditing = true;
    this.updateAbsenceData = {
      id: absence.id,
      matiereId: absence.matiere.id,
      date: absence.date,
      justifiee: absence.justifiee,
    };
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.updateAbsenceData = { id: null, matiereId: null, date: '', justifiee: false };
  }

  updateAbsence(): void {
    if (this.updateAbsenceData.id !== null) {
      this.etudiantService.updateAbsence(this.updateAbsenceData.id, this.updateAbsenceData).subscribe(
        (response) => {
          console.log('Absence updated successfully:', response);
          this.fetchAbsences();
          this.updateAbsenceData = { id: null, matiereId: null, date: '', justifiee: false };
        },
        (error) => {
          console.error('Error updating absence:', error);
        }
      );
    }
  }
}
