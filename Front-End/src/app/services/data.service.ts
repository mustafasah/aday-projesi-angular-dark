import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public apiURL = "http://localhost/"
  constructor(private http:HttpClient) { }

  login(infoLogin:any):Observable<any>{
    return this.http.post(this.apiURL+"api/auth/login",infoLogin)
  }

  logOut(){
    return this.http.get(this.apiURL+"api/auth/logout")
  }

  forget(forgetEmail:any){
    return this.http.post(this.apiURL+"api/auth/forgotpassword",{"email":forgetEmail})
  }

  newPasswordSave(newPassword:number){
    return this.http.put(this.apiURL+"api/auth/resetpassword",{"password":newPassword})
  }

  getAllCandidate(){
   return this.http.get(this.apiURL+"api/candidate")
  }

  getAllUsers(){
   return this.http.get(this.apiURL+"api/user")
  }

  getComingCandidate(){
    return this.http.get(this.apiURL+"api/candidate/comingcandidates")
   }

  getSingleCandidate(id:number){
    // let alternativePath = this.apiURL
    // if (id) {
    //   alternativePath += "api/candidate/"+id
    //   return this.http.get(alternativePath)
    // }

    return this.http.get(this.apiURL+"api/candidate/"+id)
   }

   getSingleUser(id:number){
    return this.http.get(this.apiURL+"api/user/"+id)
   }

   postAddCandidate(candidate:any){
     const httpOptions={
       headers: new HttpHeaders({
         'Content-Type' : 'application/json'
       })
     }
     return this.http.post(this.apiURL+'api/candidate/addcandidate',candidate)
    //  .pipe(
    //    catchError(this.handleError)
    //  )
    
   }

  //   public handleError(error: HttpErrorResponse) {

  //   if (error.error instanceof ErrorEvent) {

  //     console.error('An error occurred:', error.error.message);
  //   } else {

  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error.message}`);
  //   }

  //   return throwError(
  //     'Something bad happened; please try again later.');
  // }


}

