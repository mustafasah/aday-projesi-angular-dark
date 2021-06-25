import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { Candidate } from "src/app/models/Candidate";
// import { DataService } from "src/app/services/data.service";
import { FirebaseDataService } from "src/app/services/firebase-data.service";


@Component({
  selector: "app-comingCandidates",
  templateUrl: "comingCandidates.component.html",
  styleUrls: ["./comingCandidates.component.scss"]
})
export class comingCandidatesComponent implements OnInit {

  candidates: Candidate[]

  constructor(
    // public servis:DataService,
    private firebaseService:FirebaseDataService
    ) {}

  ngOnInit() {

    // this.servis.getComingCandidate().subscribe(response => {
    //   this.candidates = response
    //   this.candidates = this.candidates.data
    // })

    this.firebaseService.listComingCandidates().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(res => {
      this.candidates = res
    })

  }


}
