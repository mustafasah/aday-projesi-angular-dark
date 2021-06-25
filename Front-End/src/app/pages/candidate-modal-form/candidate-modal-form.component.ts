import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Candidate } from 'src/app/models/Candidate';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-candidate-modal-form',
  templateUrl: './candidate-modal-form.component.html',
  styleUrls: ['./candidate-modal-form.component.scss']
})
export class CandidateModalFormComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    public firebaseService:FirebaseDataService
    ) { }

  globalForm = new FormGroup({
    
    name: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    no: new FormControl('',Validators.required),
    linkedin: new FormControl(''),
    alarm: new FormControl(''),
    alarmNote: new FormControl(''),
    profile_image: new FormControl("default.jpg")

  });
  get name() { return this.globalForm.get('name') }
  get email() { return this.globalForm.get('email') }
  get no() { return this.globalForm.get('no') }
  

  ngOnInit(): void {

  }

  fepan: any
  errorMessage: any
  candidate: Candidate

  onSubmit(){
    this.candidate = (this.globalForm.value as Candidate)
    this.firebaseService.currentUser().then(userRes=>{
    this.candidate.uid = userRes.uid
    this.candidate.cretedAt = new Date().toJSON()
    this.candidate.updatedAt = new Date().toJSON()
      this.firebaseService.createCandidate(this.candidate).then(() => {
        this.fepan = true
        setTimeout(() => {
          this.fepan = ""
        }, 2500)
      },
      err =>{
        this.errorMessage = err.error.message
        setTimeout(() => {
          this.errorMessage = ""
        }, 2500)
      })

  })

 }

}

