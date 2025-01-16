import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EtudiantsComponent } from './components/etudiants/etudiants.component';
import { DetailsEtudiantComponent } from './components/details-etudiant/details-etudiant.component';
import { NotesEtudiantComponent } from './components/notes-etudiant/notes-etudiant.component';
import { AbsencesEtudiantComponent } from './components/absences-etudiant/absences-etudiant.component';
import { MatieresComponent } from './components/matieres/matieres.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'etudiants', component: EtudiantsComponent },
    { path: 'etudiants/:id/details', component: DetailsEtudiantComponent },
    { path: 'etudiants/:id/notes', component: NotesEtudiantComponent },
    { path: 'etudiants/:id/absences', component: AbsencesEtudiantComponent },
    { path: 'matieres', component: MatieresComponent },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { enableTracing: true }) 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
