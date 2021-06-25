import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Candidate } from 'src/app/models/Candidate';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

  candidates: Candidate[]
  searchText: string

  constructor(private firebaseService:FirebaseDataService) { }

  ngOnInit(): void {
    this.getAllCandidates()
    
  }

  getAllCandidates(){
    this.firebaseService.getAllCandidates().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(res => {
      this.candidates = res
    });
  }

}

