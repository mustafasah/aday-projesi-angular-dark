import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth'
import { User } from '../models/User';
import { Candidate } from '../models/Candidate';
import { Question } from '../models/Question';
import { QuestionTypes } from '../models/QuestionTypes';

@Injectable({
  providedIn: 'root'
})

export class FirebaseDataService {

  private dbCandidate = '/candidates'
  private dbUser = '/users'
  private dbQuestions = '/questions'
  private dbQuestionsTypes = 'questionTypes'

  candidateRef: AngularFireList<Candidate>
  userRef: AngularFireList<User>
  questionRef: AngularFireList<Question>
  questionsTypesRef: AngularFireList<QuestionTypes>

  constructor(private db: AngularFireDatabase,private afAuth: AngularFireAuth) {
    this.candidateRef = db.list(this.dbCandidate);
    this.userRef = db.list(this.dbUser)
    this.questionRef = db.list(this.dbQuestions)
    this.questionsTypesRef = db.list(this.dbQuestionsTypes)
  }


  currentUser=async()=>await this.afAuth.currentUser

  adminCheck=async()=>(await this.afAuth.currentUser).getIdTokenResult()

  getAllCandidates(): AngularFireList<Candidate> {
   return this.candidateRef
  }

  getAllQuestions(): AngularFireList<Question> {
   return this.questionRef
  }

  getAllQuestionsTypes(): AngularFireList<QuestionTypes> {
    return this.questionsTypesRef
   }

  addQuestion(question: Question) {
    return this.questionRef.push(question)
  }

  addQuestionType(questionType: QuestionTypes) {
    return this.questionsTypesRef.push(questionType)
  }

  createCandidate(Candidate: Candidate) {
    return this.candidateRef.push(Candidate)
  }

  updateCandidate(candidate: Candidate): Promise<any> {
    return this.candidateRef.update(candidate.key, candidate)
  }

  updateQuestion(question: Question): Promise<any> {
    return this.questionRef.update(question.key, question)
  }

  updateCandidate2(key, value): Promise<any> {
    return this.candidateRef.update(key, value)
  }

  updateUser(key: string, value: User): Promise<void> {
    return this.userRef.update(key, value)
  }

  deleteCandidate(key: string): Promise<void> {
    return this.candidateRef.remove(key)
  }

  deleteQuestion(key: string): Promise<void> {
    return this.questionRef.remove(key)
  }

  deleteAll(): Promise<void> {
    return this.candidateRef.remove()
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }

  logOut(): Promise<void> {
    return this.afAuth.signOut()
  }

  register(user: User) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
  }

  addUser(user: User):any {
    return this.userRef.push(user)
  }

  getUserByUidFromDb(uid: string) {
    return this.db.list("/users", q => q.orderByChild("uid").equalTo(uid))
  }

  listComingCandidates(): AngularFireList<any> {
    return this.db.list("/candidates", c => c.orderByChild("alarm").startAt(new Date().toJSON()) )
  }

  listEndedCandidates(): AngularFireList<any> {
    return this.db.list("/candidates", c => c.orderByChild("alarm").endAt(new Date().toJSON()) )
  }

  getCommentByActivitytaskId(taskId): AngularFireList<any> {
    return this.db.list("/candidates", c => c.orderByChild(taskId).startAt(0) )
  }

  getCandidateByKey(key: string) {
    return this.db.object("/candidates/" + key)
  }

  getQuestionByKey(key: string) {
    return this.db.object("/questions/" + key)
  }

  getIkQuestions(): AngularFireList<any> {
    return this.db.list("/questions", q => q.orderByChild("belongName").equalTo("İK Görüşme Sorusu"))
  }

  getTknkQuestions(): AngularFireList<any> {
    return this.db.list("/questions", q => q.orderByChild("belongName").equalTo("Teknik Görüşme Sorusu"))
  }

  getTklfQuestions(): AngularFireList<any> {
    return this.db.list("/questions", q => q.orderByChild("belongName").equalTo("Teklif Görüşme Sorusu"))
  }


}
