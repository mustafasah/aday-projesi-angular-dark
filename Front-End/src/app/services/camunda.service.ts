import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { Candidate } from '../models/Candidate';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: "Basic ZGVtbzpkZW1v"
  })
};

httpOptions.headers =
  httpOptions.headers.set('Authorization', 'Basic ZGVtbzpkZW1v');

// var headers_object = new HttpHeaders();
// headers_object.append('Content-Type', 'application/json');
// headers_object.append("Authorization", "Basic " + btoa("demo:demo"));

// const httpOptions = {
//   headers: headers_object
// };

@Injectable({
  providedIn: 'root'
})
export class CamundaService {
  private engineRestUrl = 'http://localhost:8080/engine-rest/'

  constructor(private http: HttpClient) { }

  getTaskHistory(taskId): Observable<any[]> {
    const endpoint = `${this.engineRestUrl}history/task?taskId=${taskId}`;
    return this.http.get<any>(endpoint)
    // .pipe(
    //   tap(form => this.log(`fetched tasks` + form)),
    //   catchError(this.handleError('getTasks', []))
    // );
  }

  getTasks(): Observable<any[]> {
    const endpoint = `${this.engineRestUrl}task?sortBy=created&sortOrder=desc&maxResults=10`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched tasks` + form)),
      catchError(this.handleError('getTasks', []))
    );
  }

  startProcess(candidateKey: any): Observable<any> {
    const endpoint = `${this.engineRestUrl}process-definition/key/Candidate-interview/start`;
    return this.http.post<any>(endpoint, {
      "variables": {
        "businessKey": {
          "value": candidateKey,
          "type": "String"
        }
      },
      "businessKey": candidateKey
    })
      .pipe(
        tap(form => this.log(`fetched startProcess` + form)),
        catchError(this.handleError('startProcess', []))
      );
  }

  checkProcessInstanceByBusinessKey(candidateId: any): Observable<any> {
    const endpoint = `${this.engineRestUrl}process-instance?businessKey=`;
    return this.http.get<any>(endpoint + candidateId).pipe(
      tap(form => this.log(`Check ProcessInstance` + form)),
      catchError(this.handleError('ProcessInstance', []))
    );
  }

  getTaskByBusinessKey(candidateId: any): Observable<any> {
    const endpoint = `${this.engineRestUrl}task?processInstanceBusinessKey=`;
    return this.http.get<any>(endpoint + candidateId).pipe(
      tap(form => this.log(` getTaskByBusinessKey` + form)),
      catchError(this.handleError('getTaskByBusinessKey', []))
    );
  }

  getTaskByProcessInstanceId(processInstanceId: any): Observable<any> {
    const endpoint = `${this.engineRestUrl}task?processInstanceId=${processInstanceId}`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(` getTaskByProcessInstanceId` + form)),
      catchError(this.handleError('getTaskByProcessInstanceId', []))
    );
  }

  getHistoryByBusinessKey(businessKey: any): Observable<any> {
    const endpoint = `${this.engineRestUrl}history/task?processInstanceBusinessKey=${businessKey}`
    return this.http.get<any>(endpoint)
    // .pipe(
    //   tap(form => this.log(`getActivityInstance ` + form)),
    //   catchError(this.handleError('getActivityInstance', []))
    // );
  }

  getActivityInstance(candidateProcessId: any): Observable<any> {
    const endpoint = `${this.engineRestUrl}history/activity-instance?activityType=userTask&sortBy=startTime&sortOrder=desc&processInstanceId=${candidateProcessId}`
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`getActivityInstance ` + form)),
      catchError(this.handleError('getActivityInstance', []))
    );
  }

  getActivityInstanceNow(candidateProcessId: any): Observable<any> {
    const endpoint = `${this.engineRestUrl}process-instance/${candidateProcessId}/activity-instances`
    return this.http.get<any>(endpoint)
    // .pipe(
    //   tap(form => this.log(`getActivityInstance ` + form)),
    //   catchError(this.handleError('getActivityInstance', []))
    // );
  }

  async getCommentByTaskId(taskId: any): Promise<any> {
    const endpoint = `${this.engineRestUrl}task/${taskId}/comment`
    return await this.http.get<any>(endpoint).toPromise()
    // .pipe(
    //   tap(form => this.log(`getCommentByTaskId `+ form)),
    //   catchError(this.handleError('getCommentByTaskId', []))
    // );
  }

  setCommentByTaskId(taskId: any, value: any): Observable<any> {
    const endpoint = `${this.engineRestUrl}task/${taskId}/comment/create`
    return this.http.post<any>(endpoint, { "message": value })
    // .pipe(
    //   tap(form => this.log(`getCommentByTaskId `+ form)),
    //   catchError(this.handleError('getCommentByTaskId', []))
    // );
  }

  claimTask(taskId: any, uid: any): Observable<any> {
    const endpoint = `${this.engineRestUrl}task/${taskId}/claim`
    return this.http.post<any>(endpoint, { "userId": `${uid}` })
    // .pipe(
    //   tap(form => this.log(`claimTask `+ form)),
    //   catchError(this.handleError('claimTask', []))
    // );
  }

  unClaimTask(taskId: any, uid: any): Observable<any> {
    const endpoint = `${this.engineRestUrl}task/${taskId}/unclaim`
    return this.http.post<any>(endpoint, { "userId": uid })
      .pipe(
        tap(form => this.log(`unClaimTask ` + form)),
        catchError(this.handleError('unClaimTask', []))
      );
  }

  camundaUserProfile(uid: any): Observable<any> {
    const endpoint = `${this.engineRestUrl}user/${uid}/profile`;
    return this.http.get<any>(endpoint)
    // .pipe(
    //   tap(form => this.log(`fetched taskform`)),
    //   catchError(this.handleError('getTaskFormKey', []))
    // );
  }

  deleteProcess(ProcessId: any): Observable<any> {
    const endpoint = `${this.engineRestUrl}process-instance/${ProcessId}`
    return this.http.delete<any>(endpoint).pipe(
      tap(form => this.log(`deleteProcess ` + form)),
      catchError(this.handleError('deleteProcess', []))
    );
  }

  getTaskFormKey(taskId: String): Observable<any> {
    const endpoint = `${this.engineRestUrl}task/${taskId}/form`;
    return this.http.get<any>(endpoint).pipe(
      tap(form => this.log(`fetched taskform`)),
      catchError(this.handleError('getTaskFormKey', []))
    );
  }

  getVariablesForTask(taskId: String, variableNames: String): Observable<any> {
    const endpoint = `${this.engineRestUrl}task/${taskId}/form-variables?variableNames=${variableNames}`;
    return this.http.get<any>(endpoint)
    // .pipe(
    //   tap(form => this.log(`fetched variables`)),
    //   catchError(this.handleError('getVariablesForTask', []))
    // );
  }

  setMessageVariableForTask(taskId: String, variableValue: String): Observable<any> {
    const endpoint = `${this.engineRestUrl}task/${taskId}/variables/message`;
    return this.http.post<any>(endpoint, { "value": variableValue })
    // .pipe(
    //   tap(form => this.log(`fetched variables`)),
    //   catchError(this.handleError('getVariablesForTask', []))
    // );
  }

  completeTask(taskId: String, variable): Observable<any> {
    const endpoint = `${this.engineRestUrl}task/${taskId}/submit-form`
    return this.http.post<any>(endpoint, {
      "variables": {
        [variable]: { "value": true }
        // ,"prensipte_uygun": { "value": false }
      }
    })
    // .pipe( 
    //   tap(tasks => this.log(tasks`posted complete task`)),
    //   catchError(this.handleError('postCompleteTaskhandleError'))
    // );
  }

  getProcessDefinitionTaskKey(processDefinitionKey): Observable<any> {
    const url = `${this.engineRestUrl}process-definition/key/${processDefinitionKey}/startForm`;
    return this.http.get<any>(url).pipe(
      tap(form => this.log(`fetched formkey`)),
      catchError(this.handleError('getProcessDeifnitionFormKey', []))
    );
  }

  getProcessDefinitions(): Observable<any[]> {
    return this.http.get<any[]>(this.engineRestUrl + 'process-definition?latestVersion=true').pipe(
      tap(processDefinitions => this.log(`fetched processDefinitions`)),
      catchError(this.handleError('getProcessDefinitions', []))
    );
  }

  postProcessInstance(processDefinitionKey, variables): Observable<any> {
    const endpoint = `${this.engineRestUrl}process-definition/key/${processDefinitionKey}/start`;
    return this.http.post<any>(endpoint, variables).pipe(
      tap(processDefinitions => this.log(`posted process instance`)),
      catchError(this.handleError('postProcessInstance', []))
    );
  }

  deployProcess(fileToUpload: File): Observable<any> {
    const endpoint = `${this.engineRestUrl}deployment/create`;
    const formData = new FormData();

    formData.append('fileKey', fileToUpload, fileToUpload.name);

    return this.http.post(endpoint, formData);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

}
