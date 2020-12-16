import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class EmissorDeEventosService {

  public emitir: EventEmitter<string>
  public emitirLogin: EventEmitter<string>

  constructor() {
    this.emitirLogin = new EventEmitter()
  }

  dispararLogin(logado){
    this.emitirLogin.emit(logado)
  }


  dispararFiltro(filtro){
    this.emitir.emit(filtro)
  }
}
