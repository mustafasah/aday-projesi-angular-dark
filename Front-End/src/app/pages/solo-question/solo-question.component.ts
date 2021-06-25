import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { Question } from 'src/app/models/Question';
import { CamundaService } from 'src/app/services/camunda.service';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-solo-question',
  templateUrl: './solo-question.component.html',
  styleUrls: ['./solo-question.component.scss']
})
export class SoloQuestionComponent implements OnInit {

  constructor(
    public router: Router,
    private activateRoute: ActivatedRoute,
    private firebaseService: FirebaseDataService,
    private camundaService: CamundaService,
    private toastr: ToastrService) { }

  questions: Question

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.firebaseService.getQuestionByKey(params.key).snapshotChanges().subscribe(res => {
        const y = { ...res.payload.toJSON(), key: res.key }
        this.questions = (y as Question)
      })
    })
  }

  save(select, questionType, selectLevel) {
    if (select == "Değiştir" || questionType == 'Değiştir' || selectLevel == "Değiştir" ) {
      this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Hata!</b> Tüm Alanları Seçin.', '', {
        disableTimeOut: false,
        closeButton: true,
        progressBar: true,
        enableHtml: true,
        toastClass: "alert alert-warning alert-with-icon",
        positionClass: 'toast-' + "top" + '-' + "center"
      }) 
    }
    else{
      this.questions.date = new Date().toJSON()
      this.questions.belongName = select
      this.questions.typeName = questionType
      this.questions.level = selectLevel
      this.firebaseService.updateQuestion(this.questions).then(res => {
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Başarılı!</b> Soru Güncellendi.', '', {
          disableTimeOut: false,
          closeButton: true,
          progressBar: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + "top" + '-' + "center"
        })
      })
    }
  }

  questionDelete() {
    let r = confirm("Emin misiniz?");
    if (r == true) {
      this.firebaseService.deleteQuestion(this.questions.key).then(res => {
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Başarılı!</b> Soru Silindi', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + "top" + '-' + "center"
        })
        this.router.navigate(['/questions'])
      })
    }
  }


}
