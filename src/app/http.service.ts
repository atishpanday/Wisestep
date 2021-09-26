import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  getRequest(url: string): Observable<any> {
    return this.http.get(url).pipe(
      catchError(this.handleError)
    )
  }

  postRequest(url: string, data: any, options?: any): Observable<any> {
    return this.http.post(url, data, options).pipe(
      catchError(this.handleError)
    )
  }

  putRequest(url: string, data: any, options?: any): Observable<any> {
    return this.http.put(url, data, options).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:'+ error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `+ error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}

