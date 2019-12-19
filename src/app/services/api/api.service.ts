import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { Headers, RequestOptions } from '@angular/http';
import {catchError, delay} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})

export class AuthService {

  constructor(private http: HttpClient) {}

  post(url, postBody: any) {
    let headers;
    let options;
    headers = new Headers();
    headers.append('Content-Type', 'application/json');
    options = new RequestOptions({ headers: headers });
    return this.http.post(url, postBody, options).pipe(
      catchError(this.handleError));
  }

  get(url) {
    return this.http.get(url).pipe(
      catchError(this.handleError));
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
