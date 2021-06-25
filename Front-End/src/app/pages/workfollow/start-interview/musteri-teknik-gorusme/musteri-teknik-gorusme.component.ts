import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';
import { CamundaService } from 'src/app/services/camunda.service';
import { StartInterviewComponent } from '../start-interview.component';

@Component({
  selector: 'MusteriTeknikGorusme',
  templateUrl: './musteri-teknik-gorusme.component.html',
  styleUrls: ['./musteri-teknik-gorusme.component.scss']
})
export class MusteriTeknikGorusmeComponent implements OnInit {
  @Input() candidate: any;

  constructor(public camundaService: CamundaService, public comp: StartInterviewComponent, public router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  backStep(textvalue) {
    this.camundaService.setCommentByTaskId(this.candidate.taskId, textvalue).subscribe()
    this.camundaService.completeTask(this.candidate.taskId, "musteri_ik_gorusmesi_yeniden_yapilsin").pipe(
      tap(() => {
        this.comp.ngOnInit()
        this.comp.ngAfterViewInit()
      })).subscribe()
  }

  adayin_tecrube_yetersiz(){
    let r = confirm("Emin misiniz?");
    if (r == true) {
      this.camundaService.completeTask(this.candidate.taskId, "adayin_tecrube_yetersiz").pipe().subscribe(res => {
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

  adayin_teknigi_yetersiz(){
    let r = confirm("Emin misiniz?");
    if (r == true) {
      this.camundaService.completeTask(this.candidate.taskId, "adayin_teknigi_yetersiz").pipe().subscribe(res => {
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

  adayin_sosyal_beceri_yetersiz(){
    let r = confirm("Emin misiniz?");
    if (r == true) {
      this.camundaService.completeTask(this.candidate.taskId, "adayin_sosyal_beceri_yetersiz").pipe().subscribe(res => {
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
