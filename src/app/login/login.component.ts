import {Component, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ErrorMessage} from "./error-message/error-message";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = '';
  password = '';

  constructor(private _service: LoginService,   private _snackBar: MatSnackBar) {
  }

  async login() {
    // console.log(this.email, this.password);
    this._service.login(this.email, this.password)
      .then(d=> {
        console.log(d);
      })
      .catch(error => {
      const message  = ErrorMessage[error.code]
      this._snackBar.open(message, 'ok', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 5000,
      });
    });
  }

  ngOnInit(): void {
  }

}
