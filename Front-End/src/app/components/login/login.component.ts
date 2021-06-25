import { FirebaseDataService } from './../../services/firebase-data.service';
import { Sonuc } from './../../models/sonuc';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { partitionArray } from '@angular/compiler/src/util';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  sonuc: Sonuc = new Sonuc();
  constructor(
    public fbService: FirebaseDataService,
    public router: Router,
    private toastr: ToastrService,
    // public authService: AuthService
  ) { 
    // this.setMessage();
  }

  ngOnInit() {
  }

  login(email: string, password: string) {
    this.fbService.login(email, password).then(res => {
      this.router.navigate(['/'])
    }, err => {
      if (err.code == "auth/user-not-found" ) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Kayıtlı E-Posta Adresi Bulunamadı";
        this.toastr.show('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Oturum Açılamadı!</b> Kayıtlı E-Posta Adresi Bulunamadı.', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: 'toast-' + "top" + '-' +  "center"
        });
      }
      if (err.code == "auth/wrong-password") {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Yanlış Parola";
        this.toastr.show('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span><b>Oturum Açılamadı!</b> Yanlış Parola.', '', {
          disableTimeOut: false,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: 'toast-' + "top" + '-' +  "center"
        });
      }

    });
  }

        //Angular guard için daha sonra yapılacak
  // message: string;
  // setMessage() {
  //   this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  // }

  // login() {
  //   this.message = 'Trying to log in ...';

  //   this.authService.login().subscribe(() => {
  //     this.setMessage();
  //     if (this.authService.isLoggedIn) {
  //       // Usually you would use the redirect URL from the auth service.
  //       // However to keep the example simple, we will always redirect to `/admin`.
  //       const redirectUrl = '/';

  //       // Redirect the user
  //       this.router.navigate([redirectUrl]);
  //     }
  //   });
  // }

  // logout() {
  //   this.authService.logout();
  //   this.setMessage();
  // }


}
