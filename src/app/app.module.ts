import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EtudiantsComponent } from './components/etudiants/etudiants.component';
import { DetailsEtudiantComponent } from './components/details-etudiant/details-etudiant.component';
import { NotesEtudiantComponent } from './components/notes-etudiant/notes-etudiant.component';
import { AbsencesEtudiantComponent } from './components/absences-etudiant/absences-etudiant.component';
import { MatieresComponent } from './components/matieres/matieres.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EtudiantsComponent,
    DetailsEtudiantComponent,
    NotesEtudiantComponent,
    AbsencesEtudiantComponent,
    MatieresComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
