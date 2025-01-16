import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EtudiantService } from '../../services/etudiant.service';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css']
})
export class EtudiantsComponent implements OnInit {
  etudiants: any[] = [];
  filteredEtudiants: any[] = [];
  searchQuery: string = ''; 
  selectedEtudiant: any = null; 
  isEditing: boolean = false; 

  constructor(private etudiantService: EtudiantService, private router: Router) {}

  ngOnInit(): void {
    this.loadEtudiants();
  }

  loadEtudiants(): void {
    this.etudiantService.getEtudiants().subscribe({
      next: (data) => {
        this.etudiants = data;
        this.filteredEtudiants = data; 
      },
      error: (err) => {
        console.error('Error fetching students:', err);
      }
    });
  }

  filterEtudiants(): void {
    
    if (this.searchQuery) {
      this.filteredEtudiants = this.etudiants.filter(etudiant =>
        etudiant.cin.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      
      this.filteredEtudiants = this.etudiants;
    }
  }

  viewDetails(id: number): void {
    this.router.navigate([`/etudiants/${id}/details`]);
  }

  viewNotes(id: number): void {
    this.router.navigate([`/etudiants/${id}/notes`]);
  }

  viewAbsences(id: number): void {
    this.router.navigate([`/etudiants/${id}/absences`]);
  }

  addEtudiant(): void {
    this.selectedEtudiant = {}; 
    this.isEditing = true;
  }

  editEtudiant(etudiant: any): void {
    this.selectedEtudiant = { ...etudiant }; 
    this.isEditing = true;
  }

  saveEtudiant(): void {
    if (this.selectedEtudiant.id) {
    
      this.etudiantService.updateEtudiant(this.selectedEtudiant.id, this.selectedEtudiant).subscribe({
        next: () => {
          this.loadEtudiants();
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Error updating student:', err);
        }
      });
    } else {
      
      this.etudiantService.createEtudiant(this.selectedEtudiant).subscribe({
        next: () => {
          this.loadEtudiants();
          this.cancelEdit();
        },
        error: (err) => {
          console.error('Error creating student:', err);
        }
      });
    }
  }

  cancelEdit(): void {
    this.selectedEtudiant = null;
    this.isEditing = false;
  }
}
