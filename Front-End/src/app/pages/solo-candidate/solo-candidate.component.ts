import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Candidate } from 'src/app/models/Candidate';
import { CamundaService } from 'src/app/services/camunda.service';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-solo-candidate',
  templateUrl: './solo-candidate.component.html',
  styleUrls: ['./solo-candidate.component.scss']
})
export class SoloCandidateComponent implements OnInit {

  constructor(
    public router: Router,
    private activateRoute: ActivatedRoute,
    private firebaseService: FirebaseDataService,
    private camundaService: CamundaService,
    private toastr: ToastrService) { }

  candidate: Candidate
  isClicked: boolean = true
  isProcess: boolean
  isHistory: boolean
  activityName: string
  activityAssigneer: string

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.firebaseService.getCandidateByKey(params.key).snapshotChanges().subscribe(res => {
        const y = { ...res.payload.toJSON(), key: res.key }
        this.candidate = (y as Candidate)
      })
      this.camundaService.checkProcessInstanceByBusinessKey(params.key).subscribe(ProcessInstance => {
        if (params.key == ProcessInstance[0].businessKey) {
          this.isProcess = true
        }
      })
      this.camundaService.getHistoryByBusinessKey(params.key).subscribe(history => {
        if (history[0]) this.isHistory = true
      })
    })
  }

  ngAfterViewInit(): void {
    this.camundaService.getActivityInstance(this.candidate.processId).subscribe(activityRes => {
      this.activityName = activityRes[0].activityName
      this.camundaService.camundaUserProfile(activityRes[0].assignee).subscribe(profile => {
        this.activityAssigneer = profile.firstName + " " + profile.lastName
      })
    })
  }

  clicled() {
    if (this.isClicked) {
      this.isClicked = false
    } else {
      this.isClicked = true
    }
  }

  save() {
    this.candidate.updatedAt = new Date().toJSON()
    this.firebaseService.updateCandidate(this.candidate).then(res => {
      this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Başarılı!</b> Profil Güncellendi.', '', {
        disableTimeOut: false,
        closeButton: true,
        progressBar: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: 'toast-' + "top" + '-' + "center"
      })
    })
  }

  candidateDelete() {
    let r = confirm("Emin misiniz?");
    if (r == true) {
      this.firebaseService.deleteCandidate(this.candidate.key).then(res => {
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Başarılı!</b> Aday Silindi', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + "top" + '-' + "center"
        })
        this.router.navigate(['/candidates'])
      })
    }
  }

  claimCandidate() {

  }


}
