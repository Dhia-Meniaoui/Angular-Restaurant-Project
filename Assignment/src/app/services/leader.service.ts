import { Injectable } from '@angular/core';
import { leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { map, catchError } from 'rxjs/operators';
import { HttpClient ,HttpHeaders } from '@angular/common/http';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LeaderService {


  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService) { }


  


  getLeaders(): Observable<leader[]> {
    return this.http.get<leader[]>(baseURL + 'leadership')
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getFeaturedLeader(): Observable<leader> {
    return this.http.get<leader[]>(baseURL + 'leadership?featured=true').pipe(map(Leaders => Leaders[0]))
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }





}
