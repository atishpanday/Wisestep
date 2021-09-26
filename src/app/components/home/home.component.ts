import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpService
  ) { }

  ngOnInit(): void {
  }

  email: string = ""

  logout() {
    this.email = localStorage.getItem("email") || ""
    this.http.putRequest("https://wisestep-two-factor-auth.herokuapp.com/logout", {
      "email": this.email
    })
      .subscribe(response => {
        if (response.message === "Success") {
          localStorage.clear()
          this.router.navigateByUrl("/login")
        } else {
          alert("Could not log you out")
        }
      })
  }

}
