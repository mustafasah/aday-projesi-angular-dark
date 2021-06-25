import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { CamundaService } from 'src/app/services/camunda.service';
import { StartInterviewComponent } from '../start-interview.component';

@Component({
  selector: 'MusteriIkGorusmesi',
  templateUrl: './musteri-ik-gorusmesi.component.html',
  styleUrls: ['./musteri-ik-gorusmesi.component.scss']
})
export class MusteriIkGorusmesiComponent implements OnInit {
  @Input() candidate: any;

  constructor(public camundaService: CamundaService, public comp: StartInterviewComponent, public router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  backStep(textvalue) {
    this.camundaService.setCommentByTaskId(this.candidate.taskId, textvalue).subscribe()
    this.camundaService.completeTask(this.candidate.taskId, "teklif_verilenler_yeniden_yapilsin").pipe(
      tap(() => {
        this.comp.ngOnInit()
        this.comp.ngAfterViewInit()
      })).subscribe()
  }

  nextStep(textvalue) {
    this.camundaService.setCommentByTaskId(this.candidate.taskId, textvalue).subscribe()
    this.camundaService.completeTask(this.candidate.taskId, "musteri_teknik_gorusme").pipe(
      tap(() => {
        this.comp.ngOnInit()
        this.comp.ngAfterViewInit()
      })).subscribe()
  }

  nextStep2(textvalue) {
    this.camundaService.setCommentByTaskId(this.candidate.taskId, textvalue).subscribe()
    this.camundaService.completeTask(this.candidate.taskId, "aday_musteriye_uygun").pipe(
      tap(() => {
        this.comp.ngOnInit()
        this.comp.ngAfterViewInit()
      })).subscribe()
  }


  aday_cv_uygun_degil(){
    let r = confirm("Emin misiniz?");
    if (r == true) {
      this.camundaService.completeTask(this.candidate.taskId, "aday_cv_uygun_degil").pipe().subscribe(res => {
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
