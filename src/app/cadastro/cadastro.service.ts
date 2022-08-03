import {Injectable} from '@angular/core';
import {RealtimeService} from "../shared/services/firebase/database/realtime.service";
import {AuthenticationService} from "../shared/services/firebase/authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class CadastroService {


  constructor(private _database: RealtimeService, private _auth: AuthenticationService) {
    this.getPlanos();
  }

  public  get authState() {
    return this._auth.authState;
  }

  logout() {
    this._auth.signOut();
  }

  gravarDados(data:any, colecao: string) {
    this._database.add(`pipo/planos_clientes/${this._auth.user?.uid}/${colecao}/`, data )


  }

 async getCliente() {
    return  this._database.get(`/pipo/clientes/${this._auth.user?.uid}`);
  }
  getPlanos() {

    return this._database.onValueChanges(`/pipo/clientes/${this._auth.user?.uid}/planos`);

  }
}
