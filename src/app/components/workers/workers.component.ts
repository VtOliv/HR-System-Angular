import { Component, OnInit } from '@angular/core';
import { MsIntegrationService } from 'src/app/services/ms-integration.service';

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit {

  workerId: number
  info: boolean = false
  cols: any
  totalItems:number

  workersList: [{
    name: "",
    id: null,
    dailyIncome: null
  }]

  constructor(private serv: MsIntegrationService) {

  }

  pageChange(event) {
    this.cardsData(event.pageIndex)
  }

  showWorkers() {
    this.info = true

    if (this.workerId != null) {
      this.serv.getWorkerById(this.workerId).subscribe(
        res => {
          this.workersList.splice(0, this.workersList.length)
          this.workersList.push(res)
        }
      )
    }
  }
  cardsData(page) {
    this.serv.getWorkersPaginated(page).subscribe(
      res => {
        this.workersList = res.content
        this.totalItems = res.totalElements
        console.log(res)
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


    this.cols = [
      { field: 'id', header: 'Worker ID' },
      { field: 'name', header: 'Name' },
      { field: 'dailyIncome', header: 'Daily Income' }
    ];

    this.cardsData(0)

  }

}
