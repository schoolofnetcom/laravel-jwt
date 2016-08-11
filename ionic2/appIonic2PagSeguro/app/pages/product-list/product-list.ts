import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from "@angular/http";
import {Cart} from "../../providers/cart/cart";
import {MyCartPage} from "../my-cart/my-cart";

@Component({
    templateUrl: 'build/pages/product-list/product-list.html',
})
export class ProductListPage implements OnInit {
    products:Array<any>;

    constructor(private nav:NavController,
                private http:Http,
                private cart:Cart) {
    }

    ngOnInit():any {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ localStorage.getItem('token')
        });
        let options = new RequestOptions({headers: headers});

        this.http.get('http://localhost:8000/api/products',options)
            .toPromise().then(response => this.products = response.json())
    }

    addItem(item){
        this.cart.addItem(item);
        this.nav.setRoot(MyCartPage);
    }
}
