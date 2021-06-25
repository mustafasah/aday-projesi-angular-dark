import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { Question } from 'src/app/models/Question';
import { CamundaService } from 'src/app/services/camunda.service';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';
import { StartInterviewComponent } from '../start-interview.component';
import { QuestionTypes } from 'src/app/models/QuestionTypes';

@Component({
  selector: 'IkGorusmesi',
  templateUrl: './ik-gorusmesi.component.html',
  styleUrls: ['./ik-gorusmesi.component.scss']
})
export class IkGorusmesiComponent implements OnInit {
  @Input() candidate: any

  questions: Question[]
  questionTypes: any = new QuestionTypes()
  form: FormGroup;

  i1: boolean = true
  i2: boolean = false

  get ordersFormArray() {
    return this.form.controls.orders as FormArray;
  }

  constructor(
    public camundaService: CamundaService,
    public comp: StartInterviewComponent,
    public router: Router,
    private toastr: ToastrService,
    public firebaseService: FirebaseDataService,
    private formBuilder: FormBuilder
  ) {

  }

  ngOnInit() {
    this.questions = []
    this.form = this.formBuilder.group({
      orders: new FormArray([])
    });
    this.firebaseService.getIkQuestions().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(res => {
      if (this.i1) {
        this.questions = res.filter(z => z.level == 1)
        if (this.questionTypes.java) {
          this.questions = this.questions.filter(z => z.typeName == `${"Java"}`)
          this.addCheckboxesToForm();
        }
        if (this.questionTypes.angular) {
          this.questions = this.questions.filter(z => z.typeName == "Angular")
          this.addCheckboxesToForm();
        }
        if (this.questionTypes.dotNet) {
          this.questions = this.questions.filter(z => z.typeName == "NET")
          this.addCheckboxesToForm();
        }
      }

      if (this.i2) {
        this.questions = res.filter(z => z.level == 2)
        if (this.questionTypes.java) {
          this.questions = this.questions.filter(z => z.typeName == "Java")
          this.addCheckboxesToForm();
        }
        if (this.questionTypes.angular) {
          this.questions = this.questions.filter(z => z.typeName == "Angular")
          this.addCheckboxesToForm();
        }
        if (this.questionTypes.dotNet) {
          this.questions = this.questions.filter(z => z.typeName == "NET")
          this.addCheckboxesToForm();
        }
      }
    })

  }

  private addCheckboxesToForm() {
    this.questions.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }

  nextStep(textvalue) {
    this.camundaService.setCommentByTaskId(this.candidate.taskId, textvalue).subscribe()
    this.camundaService.completeTask(this.candidate.taskId, "ikicin_uygun").pipe(
      tap(() => {
        this.comp.ngOnInit()
        this.comp.ngAfterViewInit()
      })).subscribe()
  }

  nextButton() {
    // let c = confirm("Soru Aşaması Sonlanıp Yenisine Geçilecektir Onaylıyor musunuz?")
    // if (c) {
      const selectedOrderNames = this.form.value.orders
        .map((checked, i) => checked ? this.questions[i].title : null)
        .filter(v => v !== null);

      this.i2 = true
      this.i1 = false

      console.log("this.form.value", this.form.value);
      console.log("ordersFormArray", this.ordersFormArray);
      console.log("selectedOrderNames", selectedOrderNames);

      this.ngOnInit()

    // }
  }

  backButton() {
      const selectedOrderNames = this.form.value.orders
        .map((checked, i) => checked ? this.questions[i].title : null)
        .filter(v => v !== null);

      this.i2 = false
      this.i1 = true
      
      console.log("this.form.value", this.form.value);
      console.log("ordersFormArray", this.ordersFormArray);
      console.log("selectedOrderNames", selectedOrderNames);

      this.ngOnInit()

  }

  onChange(subject){ 
    if (subject == "Java") {
      this.questionTypes.java = true
      this.questionTypes.dotNet = false
      this.questionTypes.angular = false
      this.ngOnInit()
    }
    if (subject == ".NET") {
      this.questionTypes.dotNet = true
      this.questionTypes.java = false
      this.questionTypes.angular = false
      this.ngOnInit()
    }
    if (subject == "Angular") {
      this.questionTypes.angular = true
      this.questionTypes.java = false
      this.questionTypes.dotNet = false
      this.ngOnInit()
    }
  }

  tecrube_yetersiz() {
    let r = confirm("Emin misiniz?");
    if (r == true) {
      this.camundaService.completeTask(this.candidate.taskId, "tecrube_yetersiz").pipe().subscribe(res => {
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Başarılı!</b> Listeye Eklendi', '', {
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

  sosyal_beceri_yetersiz() {
    let r = confirm("Emin misiniz?");
    if (r == true) {
      this.camundaService.completeTask(this.candidate.taskId, "sosyal_beceri_yetersiz").pipe().subscribe(res => {
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Başarılı!</b> Listeye Eklendi', '', {
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

  kara_liste() {
    let r = confirm("Emin misiniz?");
    if (r == true) {
      this.camundaService.completeTask(this.candidate.taskId, "kara_liste").pipe().subscribe(res => {
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Başarılı!</b> Listeye Eklendi', '', {
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

  ilgilenilen_adaylar() {
    let r = confirm("Emin misiniz?");
    if (r == true) {
      this.camundaService.completeTask(this.candidate.taskId, "ilgilenilen_adaylar").pipe().subscribe(res => {
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Başarılı!</b> Listeye Eklendi', '', {
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

  bastan_degerlendir() {
    let r = confirm("Emin misiniz?");
    if (r == true) {
      this.camundaService.completeTask(this.candidate.taskId, "bastan_degerlendir").pipe().subscribe(res => {
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Başarılı!</b> Listeye Eklendi', '', {
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


}
