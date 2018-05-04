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
import { ReportService } from '../services/report-service';
import { TransactionService } from '../services/transaction-service';
import { PlaceService } from "../services/place-service";
import { DealService } from "../services/deal-service";
import { TripService } from "../services/trip-service";
import { AuthService } from "../services/auth-service";
import { SettingService } from "../services/setting-service";
// end import services

// import pages
import { HomePage } from '../pages/home/home';
import { JobHistoryPage } from '../pages/job-history/job-history';
import { LoginPage } from '../pages/login/login';
import { PickUpPage } from '../pages/pick-up/pick-up';
import { RegisterPage } from '../pages/register/register';
import { WalletPage } from '../pages/wallet/wallet';
import { UserPage } from "../pages/user/user";
// end import pages

// AF2 Settings
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
    JobHistoryPage,
    LoginPage,
    PickUpPage,
    RegisterPage,
    WalletPage,
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
    JobHistoryPage,
    LoginPage,
    PickUpPage,
    RegisterPage,
    WalletPage,
    UserPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    DriverService,
    ReportService,
    TransactionService,
    PlaceService,
    DealService,
    TripService,
    AuthService,
    SettingService,
    /* import services */
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
