import { HttpErrorResponse } from '@angular/common/http'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
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
    this.httpService.postRequest("http://localhost:8080/get-email", { "email": this.email }, { "headers": this.headers })
      .subscribe(response => {
        this.router.navigateByUrl("/verify", {
          state: {
            email: this.email
          }
        })
      }, error => {
        if (error.error.message === "DUPLICATE_USER") {
          alert("You are logged in on another device/browser")
          this.duplicateUserFound = true
        }
      })
  }

  logoutDuplicateUser() {
    this.httpService.putRequest("http://localhost:8080/logout-duplicate-session", {
      "email": this.email
    }, { "headers": this.headers })
      .subscribe(response => {
        console.log(response.message)
        this.sendEmail()
      },
        error => {
          console.log(error)
        })
  }

  clicked: Boolean = false

  showDuplicateUser() {
    this.duplicateUserFound = true
  }
}