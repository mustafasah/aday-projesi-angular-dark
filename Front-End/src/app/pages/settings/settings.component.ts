import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public sidebarColor: string = "red";
  newPass: string

  constructor(public firebaseService: FirebaseDataService, private toastr: ToastrService) {}
  changeSidebarColor(color){
    var sidebar = document.getElementsByClassName('sidebar')[0];
    var mainPanel = document.getElementsByClassName('main-panel')[0];

    this.sidebarColor = color;

    if(sidebar != undefined){
        sidebar.setAttribute('data',color);
    }
    if(mainPanel != undefined){
        mainPanel.setAttribute('data',color);
    }
  }
  changecomingCandidatesColor(color){
    var body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
        body.classList.add(color);
    }
    else if(body.classList.contains('white-content')) {
      body.classList.remove('white-content');
    }
  }

  ngOnInit() {
  }

  onSubmit(){
    this.firebaseService.currentUser().then(userRes=>{
      userRes.updatePassword(this.newPass).then(()=>{
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Başarılı!</b> Şifreniz güncellendi.', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + "top" + '-' +  "center"
        })
      },err=>{
        if (err.code == "auth/weak-password") {
          this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Olumsuz!</b> Şifre, en az 6 haneli olmalıdır.', '', {
            disableTimeOut: false,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-danger alert-with-icon",
            positionClass: 'toast-' + "top" + '-' +  "center"
          })
        }

        if (err.code == "auth/requires-recent-login") {
          this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Zaman Aşımı!</b> Lütfen tekrar giriş yapın.', '', {
            disableTimeOut: false,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: 'toast-' + "top" + '-' +  "center"
          })
        }

      })
    })
  }

}
