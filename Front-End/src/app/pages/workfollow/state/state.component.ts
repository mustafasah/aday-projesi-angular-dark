import { Component, ElementRef, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate } from 'src/app/models/Candidate';
// import { IcIcinUygun } from 'src/app/models/IcIcinUygun';
import { IkGorusmesi } from 'src/app/models/IkGorusmesi';
import { TeklifGorusmesi } from 'src/app/models/TeklifGorusmesi';
import { TeknikGorusme } from 'src/app/models/TeknikGorusme';
import { CamundaService } from 'src/app/services/camunda.service';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit, AfterViewInit {

  @ViewChild('timelineul') private timelineul: ElementRef

  candidate: Candidate
  template: any
  interviewCancel: boolean
  stepNote: any
  steps: any

  IkGorusmesi: IkGorusmesi = new IkGorusmesi()
  TeknikGorusme: TeknikGorusme = new TeknikGorusme()
  TeklifGorusmesi: TeklifGorusmesi = new TeklifGorusmesi()
  // IcIcinUygun: IcIcinUygun = new IcIcinUygun()
  modelList: any = {
    IkGorusmesi,
    TeknikGorusme,
    TeklifGorusmesi,
    // IcIcinUygun
  }

  constructor(
    public activateRoute: ActivatedRoute,
    public firebaseService: FirebaseDataService,
    public camundaService: CamundaService,
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.firebaseService.getCandidateByKey(params.key).snapshotChanges().subscribe(res => {
        const y = { ...res.payload.toJSON(), key: res.key }
        this.candidate = (y as Candidate)
      })

      // this.camundaService.getHistoryByBusinessKey(params.key).subscribe(async activityRes => {
      //   for (const element of activityRes) {
      //     this.steps = Object.create(this.modelList[element.name].prototype)
      //     this.steps.constructor.apply(this.steps)
      //     await this.camundaService.getCommentByTaskId(element.id).then(recommend => {
      //       if (recommend[0]) this.steps.stepNote = recommend[0].message
      //     })
      //     this.toUi(this.steps)
      //   }
      // })
    })
  }

  ngAfterViewInit() {
      this.camundaService.getHistoryByBusinessKey(this.candidate.key).subscribe(async activityRes => {
        console.log("activityRes",activityRes);
        
        for (const element of activityRes) {
          this.steps = Object.create(this.modelList[element.name].prototype)
          this.steps.constructor.apply(this.steps)
          this.camundaService.camundaUserProfile(element.assignee).subscribe(profile => {
            this.steps.assignee = profile.firstName + " " + profile.lastName
          })
          await this.camundaService.getCommentByTaskId(element.id).then(recommend => {
            if (recommend[0]) this.steps.stepNote = recommend[0].message
          })
          this.toUi(this.steps)
        }
      })
  }

  toUi(resObjTemp: any) {
    this.template =
      `<li ${[resObjTemp.universalLi]}>
        ${[resObjTemp.universalDiv]}
        <div class="timeline-panel">
            <div class="timeline-heading">
                ${[resObjTemp.universalTag]}
                <div class="row d-flex justify-content-end">
                  <p class="mt-2 mr-3" id="claimp">${[resObjTemp.assignee]}</p>
                </div>
            </div>
            <div class="timeline-body">
                <div class="row d-flex justify-content-around">

                </div>
                <div class="form-group mt-3">
                <h5 class="mt-3 mb-1"><b> Başlama Tarihi: </b></h5>
                </div>
                <div class="form-group mt-3">
                <h5 class="mt-3 mb-1"><b> Bitiş Tarihi: </b></h5>
                </div>
                <div class="form-group mt-3">
                <h5 class="mt-3 mb-1"><b> Silinme Sebebi: </b></h5>
                </div>
                <h5 class="mt-3 mb-1"><b> Not: </b></h5>
                <p> ${[resObjTemp.stepNote]} </p>
            </div>
            <div class="d-flex justify-content-end">

            </div>
            <div class="d-flex justify-content-end">

          </div>
        </div>
      </li>`
    this.timelineul.nativeElement.insertAdjacentHTML('beforeend', this.template)
  }

}
