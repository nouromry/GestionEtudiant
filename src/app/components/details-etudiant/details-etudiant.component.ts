import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EtudiantService } from '../../services/etudiant.service';

@Component({
  selector: 'app-details-etudiant',
  templateUrl: './details-etudiant.component.html',
  styleUrls: ['./details-etudiant.component.css']
})
export class DetailsEtudiantComponent implements OnInit {
  etudiant: any;

  constructor(
    private route: ActivatedRoute,
    private etudiantService: EtudiantService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.etudiantService.getEtudiantById(id).subscribe((data) => {
      this.etudiant = data;
    });
  }
}
