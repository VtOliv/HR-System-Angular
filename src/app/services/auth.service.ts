import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = `${environment.url}`
  header: HttpHeaders
  private _loginUrl = `${this.apiUrl}/hr-oauth/oauth/token`

  constructor(private http: HttpClient, private router: Router) { }


  loginUser(user) {


    let headers = new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json",
      "Authorization": "Basic " + btoa("myappname123" + ':' + "myappsecret123")
    });


    let data = "username=" + user.username + "&password=" + encodeURIComponent(user.password) + "&grant_type=password&" +
        "client_secret=myappsecret123&client_id=myappname123";


    if (this._loginUrl.match(user)) {
      return this.http.post<any>(this._loginUrl, data ,{ headers: headers })
    }
  }

  loggedIn() {
    return !!sessionStorage.getItem('access_token')
  }

  getToken() {
    return sessionStorage.getItem('access_token')
  }

  logoutUser() {
    sessionStorage.clear()
    this.router.navigate(['/login'])
  }
}