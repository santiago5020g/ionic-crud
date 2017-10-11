import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ProductsPage } from '../pages/product/products/products';
import { CreateProductPage } from '../pages/product/create-product/create-product';
import { ProductEditPage } from '../pages/product/product-edit/product-edit';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductServiceProvider } from '../providers/product-service/product-service';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ProductsPage,
    CreateProductPage,
    ProductEditPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    FormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ProductsPage,
    CreateProductPage,
    ProductEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductServiceProvider
  ]
})
export class AppModule {}
