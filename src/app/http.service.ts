import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) { }

  getRequest(url: string): Observable<any> {
    return this.http.get(url)
  }

  postRequest(url: string, data: any, options?: any): Observable<any> {
    return this.http.post(url, data, options)
  }

  putRequest(url: string, data: any, options?: any): Observable<any> {
    return this.http.put(url, data, options)
  }

}

