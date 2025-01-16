import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesEtudiantComponent } from './notes-etudiant.component';

describe('NotesEtudiantComponent', () => {
  let component: NotesEtudiantComponent;
  let fixture: ComponentFixture<NotesEtudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesEtudiantComponent]
    });
    fixture = TestBed.createComponent(NotesEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
