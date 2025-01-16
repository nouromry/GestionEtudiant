import { Component, OnInit } from '@angular/core';
import { MatiereService } from '../../services/matiere.service';

@Component({
  selector: 'app-matieres',
  templateUrl: './matieres.component.html',
  styleUrls: ['./matieres.component.css'],
})
export class MatieresComponent implements OnInit {
  matieres: any[] = []; // List of matieres
  filteredMatieres: any[] = []; // Filtered list of matieres
  newMatiere = { nom: '', semester: 1, module: '', description: '' }; // Placeholder for a new matiere
  editMatiereData: any = null; // Placeholder for editing a matiere

  searchTerm: string = ''; // Search input field
  filterBy: string = 'nom'; // Filter by 'nom', 'semester' or 'module'

  constructor(private matiereService: MatiereService) {}

  ngOnInit(): void {
    this.fetchMatieres();
  }

  // Fetch all matieres
  fetchMatieres(): void {
    this.matiereService.getAllMatieres().subscribe(
      (data) => {
        this.matieres = data;
        this.filteredMatieres = data; // Initially display all matieres
      },
      (error) => {
        console.error('Error fetching matieres:', error);
      }
    );
  }


  addMatiere(): void {
    if (this.newMatiere.nom && this.newMatiere.semester && this.newMatiere.module) {
      this.matiereService.addMatiere(this.newMatiere).subscribe(
        (data) => {
          console.log('Matiere added:', data);
          this.newMatiere = { nom: '', semester: 1, module: '', description: '' }; 
          this.fetchMatieres(); 
        },
        (error) => {
          console.error('Error adding matiere:', error);
        }
      );
    }
  }

  deleteMatiere(id: number): void {
    this.matiereService.deleteMatiere(id).subscribe(
      () => {
        console.log('Matiere deleted successfully');
        this.fetchMatieres(); 
      },
      (error) => {
        console.error('Error deleting matiere:', error);
      }
    );
  }

  
  editMatiere(): void {
    if (this.editMatiereData) {
      this.matiereService.updateMatiere(this.editMatiereData.id, this.editMatiereData).subscribe(
        (data) => {
          console.log('Matiere updated:', data);
          this.editMatiereData = null; 
          this.fetchMatieres(); 
        },
        (error) => {
          console.error('Error updating matiere:', error);
        }
      );
    }
  }

  setEditMatiere(matiere: any): void {
    this.editMatiereData = { ...matiere }; 
  }

  cancelEdit(): void {
    this.editMatiereData = null;
  }

  filterMatieres(): void {
    this.filteredMatieres = this.matieres.filter((matiere) => {
      if (this.filterBy === 'nom') {
        return matiere.nom.toLowerCase().includes(this.searchTerm.toLowerCase());
      } else if (this.filterBy === 'semester') {
        return matiere.semester.toString().includes(this.searchTerm);
      } else if (this.filterBy === 'module') {
        return matiere.module.toLowerCase().includes(this.searchTerm.toLowerCase());
      }
      return false;
    });
  }
}
