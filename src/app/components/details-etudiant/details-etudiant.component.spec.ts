import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsEtudiantComponent } from './details-etudiant.component';

describe('DetailsEtudiantComponent', () => {
  let component: DetailsEtudiantComponent;
  let fixture: ComponentFixture<DetailsEtudiantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsEtudiantComponent]
    });
    fixture = TestBed.createComponent(DetailsEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
