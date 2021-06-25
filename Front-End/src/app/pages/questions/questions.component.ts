import { Component, OnInit } from '@angular/core';
import { title } from 'process';
import { map } from 'rxjs/operators';
import { Question } from 'src/app/models/Question';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  questions: Question[]
  searchText: string
  userInfo: any
  addSuccess: boolean = false

  constructor(private firebaseService:FirebaseDataService) { }

  ngOnInit(): void {
    this.getAllQuestions()
    this.firebaseService.currentUser().then(userRes=>{
      this.userInfo = userRes
    })
  }

  getAllQuestions(){
    this.firebaseService.getAllQuestions().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(res => {
      this.questions = res
    });
  }

  addQuestionButton(title, select, description, selectLevel, questionType){
    if (title && description) {
      let questionvr: Question = new Question()
      questionvr.belongName = select
      questionvr.title = title
      questionvr.description = description
      questionvr.level = selectLevel
      questionvr.typeName = questionType
      questionvr.date = new Date().toJSON()
      questionvr.userName = this.userInfo.displayName
      this.firebaseService.addQuestion(questionvr).then(res=>{
        this.addSuccess = true
      })
    }
    else{
      alert("Tüm Alanları Doldurun")
    }

  }

}
