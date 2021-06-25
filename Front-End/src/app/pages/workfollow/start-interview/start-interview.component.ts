import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, Renderer2, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, tap } from 'rxjs/operators';
import { Candidate } from 'src/app/models/Candidate';
import { IkGorusmesi } from 'src/app/models/IkGorusmesi';
import { TeklifVerilenler } from 'src/app/models/TeklifVerilenler';
import { TeklifGorusmesi } from 'src/app/models/TeklifGorusmesi';
import { TeknikGorusme } from 'src/app/models/TeknikGorusme';
import { MusteriIKGorusme } from 'src/app/models/MusteriIKGorusme';
import { MusteriTeknikGorusme } from 'src/app/models/MusteriTeknikGorusme';
import { AdayIstifasi } from 'src/app/models/AdayIstifasi';
import { DenemeSureci } from 'src/app/models/DenemeSureci';
import { User } from 'src/app/models/User';
import { CamundaService } from 'src/app/services/camunda.service';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-start-interview',
  templateUrl: './start-interview.component.html',
  styleUrls: ['./start-interview.component.scss']
})
export class StartInterviewComponent implements OnInit, AfterViewInit {

  @ViewChild('timelineul') private timelineul: ElementRef

  candidate: Candidate
  user: User
  template: any
  interviewCancel: boolean
  stepNote: any
  steps: any

  modelList: any = {
    IkGorusmesi,
    TeknikGorusme,
    TeklifGorusmesi,
    TeklifVerilenler,
    MusteriIKGorusme,
    MusteriTeknikGorusme,
    AdayIstifasi,
    DenemeSureci
  }

  constructor(
    public activateRoute: ActivatedRoute,
    public router: Router,
    public renderer: Renderer2,
    public firebaseService: FirebaseDataService,
    public camundaService: CamundaService,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.steps = ""
    this.firebaseService.currentUser().then(userRes => {
      this.firebaseService.getUserByUidFromDb(userRes.uid).snapshotChanges().subscribe(res => {
        const y = { ...res[0].payload.toJSON(), key: res[0].key }
        this.user = (y as User)
      })
    })

    this.activateRoute.params.subscribe(params => {
      this.camundaService.checkProcessInstanceByBusinessKey(params.key).subscribe(camundaCheckres => {
        if (!camundaCheckres[0]) {
          this.camundaService.startProcess(params.key).subscribe(startRes => {
            this.firebaseService.updateCandidate2(params.key, { processId: startRes.id }).then(() => {
              this.camundaService.getTaskByProcessInstanceId(startRes.id).subscribe(resId => {
                this.firebaseService.updateCandidate2(params.key, { taskId: resId[0].id })
              })
            })
          })
        }
      })

      this.firebaseService.getCandidateByKey(params.key).snapshotChanges().subscribe(res => {
        const y = { ...res.payload.toJSON(), key: res.key, stepNotes: { ik: false, tknk: false, tklfgrs: false, tklfvrln: false, mstrikgrs: false, mstrtknkgrs: false, adyistf: false, dnmsrc: false}}
        this.candidate = (y as Candidate)
      })
    })
    this.interviewCancel = false
    this.candidate.stepNotes.ik = false
    this.candidate.stepNotes.tknk = false
    this.candidate.stepNotes.tklfgrs = false
    this.candidate.stepNotes.tklfvrln = false
    this.candidate.stepNotes.mstrikgrs = false
    this.candidate.stepNotes.mstrtknkgrs = false
    this.candidate.stepNotes.adyistf = false
    this.candidate.stepNotes.dnmsrc = false
  }

  ngAfterViewInit() {
    this.renderer.setProperty(this.timelineul.nativeElement, 'innerHTML', '')
    setTimeout(() => {
      this.camundaService.getActivityInstance(this.candidate.processId).subscribe(async activityRes => {
        console.log("activityRes",activityRes);
        
        if (activityRes[0].activityName == 'IkGorusmesi') {
          this.candidate.stepNotes.ik = true
        }
        if (activityRes[0].activityName == 'TeknikGorusme') {
          this.candidate.stepNotes.tknk = true
        }
        if (activityRes[0].activityName == 'TeklifGorusmesi') {
          this.candidate.stepNotes.tklfgrs = true
        }
        if (activityRes[0].activityName == 'TeklifVerilenler') {
          this.candidate.stepNotes.tklfvrln = true
        }
        if (activityRes[0].activityName == 'MusteriIKGorusme') {
          this.candidate.stepNotes.mstrikgrs = true
        }
        if (activityRes[0].activityName == 'MusteriTeknikGorusme') {
          this.candidate.stepNotes.mstrtknkgrs = true
        }
        if (activityRes[0].activityName == 'AdayIstifasi') {
          this.candidate.stepNotes.adyistf = true
        }
        if (activityRes[0].activityName == 'DenemeSureci') {
          this.candidate.stepNotes.dnmsrc = true
        }

        let activityList = activityRes
        activityList.splice(0,1)

        for (const element of activityList) {
          this.steps = Object.create(this.modelList[element.activityName].prototype)
          this.steps.constructor.apply(this.steps)
          this.camundaService.camundaUserProfile(element.assignee).subscribe(profile => {
            this.steps.assignee = profile.firstName + " " + profile.lastName
          })
          await this.camundaService.getCommentByTaskId(element.taskId).then(recommend => {
            if (recommend[0]) this.steps.stepNote = recommend[0].message
          })
          this.toUi(this.steps)
        }
      })
    }, 250)
    this.camundaService.getTaskByProcessInstanceId(this.candidate.processId).subscribe(resId => {
      this.firebaseService.updateCandidate2(this.candidate.key, { taskId: resId[0].id })
    })
    this.timelineul.nativeElement.addEventListener('click', this.onClick.bind(this))
  }

  deleteInterview() {
    this.steps = ""
    this.activateRoute.params.subscribe(params => {
      this.firebaseService.updateCandidate2(params.key, { processId: "", taskId: "" })
    })
    this.camundaService.deleteProcess(this.candidate.processId).subscribe(() => { })
    this.interviewCancel = true
  }

  reStart() {
    this.ngOnInit()
    this.ngAfterViewInit()
  }

  onClick(event) {
    if (event.target.classList[0] == "universalButton") {
      this.stepNote = document.getElementById("textarea")
      this.camundaService.setCommentByTaskId(this.candidate.taskId, this.stepNote.value).subscribe(res => {
        // this.firebaseService.updateCandidate(this.candidate)
        // this.firebaseService.updateCandidate2(this.candidate.key, { [this.candidate.taskId]: this.stepNote.value })
      })
      this.camundaService.completeTask(this.candidate.taskId, event.target.id).pipe(
        tap(() => {
          this.ngOnInit(), this.ngAfterViewInit()
        })).subscribe()
    }
    if (event.target.classList[0] == "navButton") {
      this.stepNote = document.getElementById("textarea")
      this.camundaService.setCommentByTaskId(this.candidate.taskId, this.stepNote.value).subscribe(res => {
        // this.firebaseService.updateCandidate(this.candidate)
        // this.firebaseService.updateCandidate2(this.candidate.key, { [this.candidate.taskId]: this.stepNote.value })
      })
      this.camundaService.completeTask(this.candidate.taskId, event.target.id).pipe(
        tap(() => {
          // this.router.navigate(['/'])
          this.interviewCancel = true
          // this.ngOnInit(), this.ngAfterViewInit()
        })).subscribe()
    }
    if (event.target.id == this.candidate.taskId) {
      this.camundaService.claimTask(this.candidate.taskId, this.user.uid).subscribe(() => {
        document.getElementById("claimp").innerHTML = this.user.name
      })
    }
    if (event.target.id == "unclaim") {
      this.camundaService.unClaimTask(this.candidate.taskId, this.user.uid).subscribe(() => {
        document.getElementById("claimp").innerHTML = ""
      })
    }
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
                  <!--<${[resObjTemp.claimButton]}id="${this.candidate.taskId}"><i class="tim-icons icon-tap-02 mb-1" id="${this.candidate.taskId}"></i> Devral</button>-->
                  <!--<${[resObjTemp.unClaimButton]}id="unclaim"><i class="tim-icons icon-simple-remove mb-1" id="unclaim"></i> Bırak</button>-->
                </div>
            </div>
            <div class="timeline-body">
            <!--<div class="row d-flex justify-content-around">
                  ${[resObjTemp.navButton]}
                  ${[resObjTemp.navButton2]}
                  ${[resObjTemp.navButton3]}
                  ${[resObjTemp.navButton4]}
                  ${[resObjTemp.navButton5]}
                </div>-->
                <!--<div class="form-group mt-3">
                  <label> Görüşme Notu, Durum Değerlendirilmesi Belirtin </label>
                  <textarea class="form-control" id="textarea"></textarea>
                </div>-->
                <h5 class="mt-3 mb-1"><b> Not: </b></h5>
                <p> ${[resObjTemp.stepNote]} </p>
            </div>
            <!--<div class="d-flex justify-content-end">
              ${[resObjTemp.universalButton]}
            </div>-->
            <!--<div class="d-flex justify-content-end">
              ${[resObjTemp.universalButton2]}
            </div>-->
            <!--<div class="d-flex justify-content-end">
              ${[resObjTemp.universalButton3]}
            </div>-->
            <!--<div class="d-flex justify-content-end">
              ${[resObjTemp.universalButton4]}
            </div>-->
          </div>
        </li>`
    this.timelineul.nativeElement.insertAdjacentHTML('beforeend', this.template)
  }


}
