import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HttpService } from 'src/app/http.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private httpService: HttpService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  email: string = ""
  response: string = ""
  duplicateUserFound: Boolean = false

  headers = {
    "Content-Type": "application/json"
  }

  sendEmail() {
    console.log(this.email)
    this.httpService.postRequest("http://localhost:8080/get-email", {"email": this.email}, {"headers": this.headers})
    .subscribe(response => {
      if(response.message === "CREATED") {
        this.router.navigateByUrl("/verify", {state: {
          email: this.email
        }})
      } else if(response.message === "DUPLICATE_USER") {
        alert("You are already signed in on another device/browser.")
        this.duplicateUserFound = true
      }
    })
  }

  logoutDuplicateUser() {
    this.httpService.putRequest("http://localhost:8080/logout-duplicate-session", {
      "email": this.email
    }, {"headers": this.headers})
    .subscribe(response => {
      if(response.message === "Success") {
        this.sendEmail()
      } else {
        alert("Failed to logout duplicate user")
        this.router.navigateByUrl("/")
      }
    })
  }

}