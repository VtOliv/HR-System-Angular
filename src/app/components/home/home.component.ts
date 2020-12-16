import { Component, OnInit } from '@angular/core';
import { MsIntegrationService } from 'src/app/services/ms-integration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  UserName: String
  
  constructor(private serv: MsIntegrationService) { }

  ngOnInit(): void {

    this.serv.getUserById(sessionStorage.username).subscribe(res => {
      let text = res.name
      let nome = text.split(" ")[0].trim()
      this.UserName = nome
    })
  }

}
