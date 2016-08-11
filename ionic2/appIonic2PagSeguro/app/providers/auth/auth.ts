import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';

/*
 Generated class for the Auth provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class Auth {

    constructor(private http: Http) {
    }

    login(email, password): Promise<Object> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        return this.http.post('http://localhost:8000/api/login', JSON.stringify({
            email: email,
            password: password
        }), options).toPromise().then(response => {
            let obj = response.json();
            let token = obj.token;
            let payload = token.substring(token.indexOf('.')+1,token.lastIndexOf('.'));
            localStorage.setItem('token', token);
            localStorage.setItem('payload',atob(payload));
            return obj;
        });
    }
}

