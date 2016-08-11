import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HelloIonicPage} from './pages/hello-ionic/hello-ionic';
import {ProductListPage} from './pages/product-list/product-list';
import {MyCartPage} from './pages/my-cart/my-cart';
import {HTTP_PROVIDERS, Http} from "@angular/http";
import {Cart} from "./providers/cart/cart";
import {LoginPage} from "./pages/login/login";
import {Auth} from "./providers/auth/auth";

@Component({
  templateUrl: 'build/app.html',
  providers: [Cart, Auth]
})
class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    private platform: Platform,
    private menu: MenuController,
    private http: Http
  ) {
    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'Listagem de produtos', component: ProductListPage },
      { title: 'Meu carrinho', component: MyCartPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }


}

ionicBootstrap(MyApp,[HTTP_PROVIDERS]);
