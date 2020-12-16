import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { EmissorDeEventosService } from 'src/app/services/event-emitter.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import { AuthGuardService } from 'src/app/guard/auth-guard.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  providers:[MessageService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public emitirLogin: EventEmitter<string>
  userData: any = {
    username: '',
    password: '',
    grant_type: 'password'
  };

  constructor(private auth: AuthService,
    private router: Router,
    private toast: MessageService,
    private emissorDeEventos: EmissorDeEventosService, @Inject(DOCUMENT)
    private msg: AuthGuardService) {

      this.emitirLogin = new EventEmitter()
     }

  ngOnInit(): void {
  }


  loginUser() {
    sessionStorage.clear()
    this.auth.loginUser(this.userData)
      .subscribe(
        res => {
          console.log(res)
          sessionStorage.setItem('access_token', res.access_token);
          this.router.navigate(['home']);
          sessionStorage.setItem('username', this.userData.username);
          this.emissorDeEventos.dispararLogin(sessionStorage.username) },
        err => {
          if(err.status == 404) { this.toast.add({severity:"info",summary:"Verifique sua conexão"}) }
          if(err.status == 400 || err.status == 401 ) { this.toast.add({severity:"info",summary:"Não foi possivel realizar login"}) }
          if(err.status == 403) { this.toast.add({severity:"info",summary:"Login ou Senha Inválidos"}) }
        }
        
      )
    }


}
