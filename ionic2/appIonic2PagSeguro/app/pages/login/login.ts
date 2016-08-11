import { Component } from '@angular/core';
import {NavController, Alert} from 'ionic-angular';
import {Auth} from "../../providers/auth/auth";
import {MyCartPage} from "../my-cart/my-cart";
import {Http, Headers, RequestOptions} from "@angular/http";
declare var PagSeguroDirectPayment;
/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
})
export class LoginPage {
  email:String
  password:String
  constructor(private nav: NavController, private auth: Auth, private http: Http) {}

  login(){
    this.auth.login(this.email,this.password)
        .then(response => {
          this.getSession();
          this.nav.setRoot(MyCartPage)
        },
        responseError => {
          let alert = Alert.create({
            title: 'Mensagem de erro',
            subTitle: 'Não foi possível realizar o login',
            buttons: ['Fechar']
          });
          this.nav.present(alert);
        });
  }

  getSession(){
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('token')
    });
    let options = new RequestOptions({headers: headers});
    this.http.get('http://localhost:8000/api/session',options)
        .toPromise().then(response => PagSeguroDirectPayment.setSessionId(response.json().sessionId))
  }
}
