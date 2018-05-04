import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Import moment module
import { MomentModule } from 'angular2-moment';

// import services
import { DriverService } from '../services/driver-service';

import { PlaceService } from '../services/place-service';
import { TripService } from '../services/trip-service';
import { SettingService } from "../services/setting-service";
import { DealService } from "../services/deal-service";
import { AuthService } from "../services/auth-service";


import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PaymentMethodPage } from '../pages/payment-method/payment-method';
import { PlacesPage } from '../pages/places/places';
import { RegisterPage } from '../pages/register/register';
import { TrackingPage } from '../pages/tracking/tracking';
import { MapPage } from "../pages/map/map";
import { UserPage } from '../pages/user/user';


export const firebaseConfig = {
  apiKey: "AIzaSyC0LtAbgJPABKTsPSSaZQzp27lkJhFJTNI",
    authDomain: "tracker-ed8c8.firebaseapp.com",
    databaseURL: "https://tracker-ed8c8.firebaseio.com",
    projectId: "tracker-ed8c8",
    storageBucket: "tracker-ed8c8.appspot.com",
    messagingSenderId: "980536398546"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PaymentMethodPage,
    PlacesPage,
    RegisterPage,
    TrackingPage,
    MapPage,
    UserPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MomentModule,
    IonicModule.forRoot(MyApp,{
      mode: 'md'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PaymentMethodPage,
    PlacesPage,
    RegisterPage,
    TrackingPage,
    MapPage,
    UserPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    DriverService,
    PlaceService,
    TripService,
    SettingService,
    DealService,
    AuthService,
    { provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
