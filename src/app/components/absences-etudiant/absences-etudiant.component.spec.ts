import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsencesEtudiantComponent } from './absences-etudiant.component';

describe('AbsencesEtudiantComponent', () => {
  let component: AbsencesEtudiantComponent;
  let fixture: ComponentFixture<AbsencesEtudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbsencesEtudiantComponent]
    });
    fixture = TestBed.createComponent(AbsencesEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
