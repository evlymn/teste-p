import {Injectable} from '@angular/core';
import {AuthenticationService} from "../shared/services/firebase/authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public auth: AuthenticationService
  ) {
  }

  async login(email: string, password: string) {
   return  await this.auth.signInWithEmailAndPassword(email, password);
  }
}
