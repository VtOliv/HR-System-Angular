import { Component, OnInit } from '@angular/core';
import { MsIntegrationService } from 'src/app/services/ms-integration.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  workerId: number
  days: number
  info: boolean = false
  teste: boolean = false

  formRequest = [{
    workerId: 0,
    days: 0
  }]

  workerData = [{
    name: "",
    dailyIncome: 0,
    days: 0,
    total: 0
  }]

  constructor(private serv: MsIntegrationService) {

  }

  mudarCor() {
    if( this.teste == false) {
      this.teste = true
    } else {
      this.teste = false
    }

    
  }

  getWorkerPayment() {
    this.info = true
    this.serv.getWorkerPayment(this.workerId,this.days).subscribe(
      res => {
        this.workerData.splice(0, 1)
        this.workerData.push(res)
      }
    )
  }

  cancelarLetras(event: any) {
    let evento = event;
    let key = evento.keyCode || evento.which;
    key = String.fromCharCode(key);
    let regex = /^[0-9]+$/;
    if (!regex.test(key)) {
      evento.returnValue = false;
      if (evento.preventDefault) evento.preventDefault();
    }
  }


  ngOnInit(): void {
  }

}
