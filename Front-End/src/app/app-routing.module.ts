import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo, canActivate  } from '@angular/fire/auth-guard';
import { AuthContGuard } from "./services/auth-cont.guard";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);


export const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, },
  // { path: 'candidates', component: CandidatesComponent, canActivate: [AuthContGuard]  },

  {
    path: "",
    redirectTo: "comingCandidates",
    pathMatch: "full",
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    }
  },
  
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    },
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      },
    ]
  },

  {
    path: "**",
    redirectTo: "comingCandidates",
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectUnauthorizedToLogin
    }
  },

  // {
  //   path: 'kayitekle',
  //   component: KayitekleComponent,
  //   canActivate: [AngularFireAuthGuard],
  //   data: {
  //     authGuardPipe: redirectLogin
  //   }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes
    //   , {
    //   useHash: true
    // }
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
