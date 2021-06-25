import { User } from './../../models/User';
import { FirebaseDataService } from './../../services/firebase-data.service';
import { Sonuc } from './../../models/sonuc';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  sonuc: Sonuc = new Sonuc()
  selectUser: User = new User()
  
  constructor(
    public fbService: FirebaseDataService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  register() {
    this.fbService.register(this.selectUser).then(res => {
      res.user.updateProfile({
        displayName: this.selectUser.name,
        photoURL: "default.jpg",
      })
      this.selectUser.uid = res.user.uid
      this.fbService.addUser(this.selectUser).then(()=>this.router.navigate(['/']))
    }, err => {
      if (err.code == "auth/weak-password") {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "En az 6 Karakterli bir Parola girin"
        this.toastr.show('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Kayıt Olunamadı!</b> Lütfen En az 6 Karakterli bir Parola girin.', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: 'toast-' + "top" + '-' +  "center"
        });
      }
      if (err.code == "auth/email-already-in-use") {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "E-Posta Adres Daha Önce Kullanılmış"
        this.toastr.show('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Kayıt Olunamadı!</b> E-Posta Adres Daha Önce Kullanılmış.', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: 'toast-' + "top" + '-' +  "center"
        });
      }
      if (err.code == "auth/invalid-email") {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Lütfen Geçerli bir E-Posta Adresi girin"
        this.toastr.show('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Kayıt Olunamadı!</b> Lütfen Geçerli bir E-Posta Adresi girin.', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: 'toast-' + "top" + '-' +  "center"
        });
      }

    });
  }


}
