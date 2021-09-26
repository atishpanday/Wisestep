import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {

  constructor(
    private http: HttpService,
    private router: Router
  ) {
    this.email = this.router.getCurrentNavigation()?.extras.state?.email
   }

  email: string = ""
  code: string = ""

  headers = {
    "Content-Type": "application/json"
  }
  
  ngOnInit(): void {}

  sendCode() {
    this.http.postRequest("http://localhost:8080/get-code", {
      "email": this.email,
      "code": this.code
    }, {"headers": this.headers})
    .subscribe(response => {
      if(response !== null) {
        localStorage.setItem("email", response.email)
        localStorage.setItem("session-id", response.session_id)
        alert("Successfully logged in!")
        if(localStorage.getItem("session-id")) this.router.navigateByUrl("/home")
      } else {
        alert("Incorrect code")
      }
    })
  }

}
