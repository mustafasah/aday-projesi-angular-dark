import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { User } from "src/app/models/User";
import { FirebaseDataService } from "src/app/services/firebase-data.service";

@Component({
  selector: "app-user",
  templateUrl: "user.component.html"
})

export class UserComponent implements OnInit {

  constructor(
    public firebaseService:FirebaseDataService,
    private toastr: ToastrService ) {}

  user: User = new User()
  date: Date = new Date()

  ngOnInit() {
    this.firebaseService.currentUser().then(userRes=>{
      this.firebaseService.getUserByUidFromDb(userRes.uid).snapshotChanges().subscribe(res => {
        const y = { ...res[0].payload.toJSON(), key: res[0].key }
        this.user = (y as User)
      })
    })
  }

  save(){
    this.firebaseService.currentUser().then(userRes=>{
      userRes.updateEmail(this.user.email).then(()=>{
        this.firebaseService.updateUser(this.user.key, this.user).then(() => {
          this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Başarılı!</b> Profil Güncellendi.', '', {
            disableTimeOut: false,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: 'toast-' + "top" + '-' +  "center"
          })
        })
        userRes.updateProfile({
          displayName: this.user.name,
          photoURL: this.user.photoUrl
        })
        this.user.updatedAt = this.date.getTime().toString()
      }).catch(err=>{
        if (err.code = "auth/requires-recent-login") {
          this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Zaman Aşımı!</b> E-Posta Adresi Değişmek istiyorsanız lütfen tekrar giriş yapın.', '', {
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
