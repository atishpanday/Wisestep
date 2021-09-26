import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpService
  ) { }

  email: string = localStorage.getItem("email") || ""
  session_id: string = localStorage.getItem("session-id") || ""

  isLoggedIn: Boolean = false

  authenticate() {
    return this.http.postRequest("http://localhost:8080/authenticate", {
      "email": this.email,
      "session_id": this.session_id
    }, { "headers": { "Content-Type": "application/json" } })
      .subscribe(response => {
        console.log(response.message)
        if (response.message === "Success") {
          this.isLoggedIn = true
        } else this.isLoggedIn = false
        return this.isLoggedIn
      })
  }
}
