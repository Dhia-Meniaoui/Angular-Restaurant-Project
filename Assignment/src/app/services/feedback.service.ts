import { Injectable } from '@angular/core';
import { Feedback } from '../shared/feedback';
import { Observable, of } from 'rxjs';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }


  getfeedback(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(baseURL + 'Feedback/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
    

  postfeedback(Feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback/' , Feedback, httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }




}


