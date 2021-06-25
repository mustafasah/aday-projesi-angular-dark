import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ModalModule } from 'ngx-bootstrap/modal';

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { comingCandidatesComponent } from "../../pages/comingCandidates/comingCandidates.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { UserComponent } from "../../pages/user/user.component";
import { StatisticsComponent } from "src/app/pages/statistics/statistics.component";
import { CandidateModalFormComponent } from "src/app/pages/candidate-modal-form/candidate-modal-form.component";
import { CandidatesComponent } from "src/app/pages/candidates/candidates.component";
import { SoloCandidateComponent } from "src/app/pages/solo-candidate/solo-candidate.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { StartInterviewComponent } from "src/app/pages/workfollow/start-interview/start-interview.component";
import { StateComponent } from "src/app/pages/workfollow/state/state.component";
import { IkGorusmesiComponent } from "src/app/pages/workfollow/start-interview/ik-gorusmesi/ik-gorusmesi.component";
import { TeknikGorusmeComponent } from "src/app/pages/workfollow/start-interview/teknik-gorusme/teknik-gorusme.component";
import { TeklifGorusmesiComponent } from "src/app/pages/workfollow/start-interview/teklif-gorusmesi/teklif-gorusmesi.component";
import { TeklifVerilenlerComponent } from "src/app/pages/workfollow/start-interview/teklif-verilenler/teklif-verilenler.component";
import { MusteriIkGorusmesiComponent } from "src/app/pages/workfollow/start-interview/musteri-ik-gorusmesi/musteri-ik-gorusmesi.component";
import { AdayIstifasiComponent } from "src/app/pages/workfollow/start-interview/aday-istifasi/aday-istifasi.component";
import { MusteriTeknikGorusmeComponent } from "src/app/pages/workfollow/start-interview/musteri-teknik-gorusme/musteri-teknik-gorusme.component";
import { DenemeSureciComponent } from "src/app/pages/workfollow/start-interview/deneme-sureci/deneme-sureci.component";
import { QuestionsComponent } from "src/app/pages/questions/questions.component";
import { SoloQuestionComponent } from "src/app/pages/solo-question/solo-question.component";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    Ng2SearchPipeModule
  ],
  declarations: [
    comingCandidatesComponent,
    UserComponent,
    IconsComponent,
    StatisticsComponent,
    CandidateModalFormComponent,
    CandidatesComponent,
    SoloCandidateComponent,
    StartInterviewComponent,
    StateComponent,
    IkGorusmesiComponent,
    TeknikGorusmeComponent,
    TeklifGorusmesiComponent,
    TeklifVerilenlerComponent,
    MusteriIkGorusmesiComponent,
    AdayIstifasiComponent,
    MusteriTeknikGorusmeComponent,
    DenemeSureciComponent,
    QuestionsComponent,
    SoloQuestionComponent
  ]
})
export class AdminLayoutModule { }
