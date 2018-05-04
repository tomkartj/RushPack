webpackJsonp([0],{

/***/ 160:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_trip_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_home__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var UserPage = (function () {
    function UserPage(nav, authService, navParams, alertCtrl, toastCtrl, loadingCtrl, platform, tripService) {
        var _this = this;
        this.nav = nav;
        this.authService = authService;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.platform = platform;
        this.tripService = tripService;
        this.user = { photoURL: 'http://placehold.it/50x50' }; //setting default image, if user dont have images
        this.tripCount = 0;
        this.totalSpent = 0;
        this.tabs = 'profile';
        var userx = navParams.get('user');
        this.authService.getUser(userx.uid).take(1).subscribe(function (snapshot) {
            snapshot.uid = snapshot.$key;
            _this.user = snapshot;
            _this.user.isEmailVerified = __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]().currentUser.emailVerified;
            console.log(_this.user);
        });
        authService.getCardSetting().take(1).subscribe(function (snapshot) {
            _this.number = snapshot.number;
            _this.exp = snapshot.exp;
            _this.cvv = snapshot.cvv;
        });
    }
    // save user info
    UserPage.prototype.save = function () {
        this.authService.updateUserProfile(this.user);
        this.nav.pop();
        this.displayToast("Profile has been updated");
    };
    // choose file for upload
    UserPage.prototype.chooseFile = function () {
        document.getElementById('avatar').click();
    };
    // upload thumb for item
    UserPage.prototype.upload = function () {
        var _this = this;
        // Create a root reference
        var storageRef = __WEBPACK_IMPORTED_MODULE_3_firebase__["storage"]().ref();
        var loading = this.loadingCtrl.create({ content: 'Please wait...' });
        loading.present();
        for (var _i = 0, _a = [document.getElementById('avatar').files[0]]; _i < _a.length; _i++) {
            var selectedFile = _a[_i];
            var path = '/users/' + Date.now() + ("" + selectedFile.name);
            var iRef = storageRef.child(path);
            iRef.put(selectedFile).then(function (snapshot) {
                loading.dismiss();
                _this.user.photoURL = snapshot.downloadURL;
            });
        }
    };
    UserPage.prototype.logout = function () {
        var _this = this;
        this.authService.logout().then(function () {
            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
        });
    };
    UserPage.prototype.getTrips = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({ content: 'Please wait...' });
        loading.present();
        this.tripService.getTrips().take(1).subscribe(function (snapshot) {
            _this.trips = snapshot.reverse();
            loading.dismiss();
        });
    };
    UserPage.prototype.verifyPhone = function () {
        var _this = this;
        if (this.platform.is('core')) {
            this.displayToast("Only Works on Device");
        }
        else {
            console.log(this.user.phoneNumber);
            window.AccountKitPlugin.loginWithPhoneNumber({
                useAccessToken: true,
                defaultCountryCode: "IN",
                facebookNotificationsEnabled: true,
                initialPhoneNumber: ["+91", this.user.phoneNumber]
            }, function (data) {
                _this.displayToast("Verified Successfully");
                _this.user.isPhoneVerified = true;
                _this.authService.updateUserProfile(_this.user);
            });
        }
    };
    UserPage.prototype.verifyEmail = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_3_firebase__["auth"]().currentUser.sendEmailVerification().then(function (data) {
            _this.displayToast("Please check your inbox");
        }).catch(function (err) { return console.log(err); });
    };
    UserPage.prototype.displayToast = function (message) {
        this.toastCtrl.create({ duration: 2000, message: message }).present();
    };
    // save card settings
    UserPage.prototype.saveCard = function () {
        var _this = this;
        var exp = this.exp.split('/');
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        Stripe.card.createToken({
            number: this.number,
            exp_month: exp[0],
            exp_year: exp[1],
            cvc: this.cvv
        }, function (status, response) {
            loading.dismiss();
            // success
            if (status == 200) {
                // if nav from payment method selection
                if (_this.navParams.get('back')) {
                    _this.nav.pop();
                }
                else {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_7__home_home__["a" /* HomePage */]);
                }
                _this.authService.updateCardSetting(_this.number, _this.exp, _this.cvv, response.id);
                var toast = _this.toastCtrl.create({
                    message: 'Your card setting has been updated',
                    duration: 3000,
                    position: 'middle'
                });
                toast.present();
            }
            else {
                // error
                var alert_1 = _this.alertCtrl.create({
                    title: 'Error',
                    subTitle: response.error.message,
                    buttons: ['OK']
                });
                alert_1.present();
            }
        });
    };
    UserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-user',template:/*ion-inline-start:"C:\Ionic\RushPack\rider\src\pages\user\user.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    \n    <ion-buttons end>\n      <button ion-button (click)="logout()">Logout</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-segment [(ngModel)]="tabs">\n    <ion-segment-button value="profile">\n      Basic Profile\n    </ion-segment-button>\n    <ion-segment-button value="cardsetting">\n      Payments\n    </ion-segment-button>\n    <ion-segment-button value="ridehistroy" (click)="getTrips()">\n      History\n    </ion-segment-button>\n  </ion-segment>\n  <div [ngSwitch]="tabs">\n    <div *ngSwitchCase="\'profile\'" padding>\n        <div>\n            <img src="{{ user.photoURL }}" style="width:50px;height:50px;border-radius:100px" (click)="chooseFile()">\n            <form ngNoForm>\n              <input id="avatar" name="file" type="file" (change)="upload()">\n            </form>\n            <h3>{{user.name}}</h3>\n        </div>\n      <ion-list no-lines>\n        <ion-item>\n          <ion-label stacked color="primary">Name</ion-label>\n          <ion-input type="text" [(ngModel)]="user.name"></ion-input>\n        </ion-item>\n        <ion-item>\n          <button ion-button item-right clear *ngIf="!user.isPhoneVerified" (click)="verifyPhone()">Verify</button>\n          <ion-label stacked color="primary">Phone</ion-label>\n          <ion-input type="text" [(ngModel)]="user.phoneNumber" [disabled]="user.isPhoneVerified"></ion-input>\n        </ion-item>\n        <ion-item>\n          <button ion-button item-right clear *ngIf="!user.isEmailVerified" (click)="verifyEmail()">Verify</button>\n          <ion-label stacked color="primary">Email</ion-label>\n          <ion-input type="text" [(ngModel)]="user.email" disabled></ion-input>\n        </ion-item>\n        <ion-item>\n          <button ion-button block (click)="save()">Save</button>\n        </ion-item>\n      </ion-list>\n    </div>\n    <div *ngSwitchCase="\'cardsetting\'" padding>\n      <ion-grid>\n        <ion-row>\n          <ion-item no-lines>\n            <ion-label stacked>CARD NUMBER</ion-label>\n            <ion-input type="text" [(ngModel)]="number" size="20"></ion-input>\n          </ion-item>\n        </ion-row>\n        <ion-row class="split-row">\n          <ion-col col-6>\n            <ion-item no-lines>\n              <ion-input type="text" [(ngModel)]="exp" size="5" placeholder="Expiry(mm/yy)"></ion-input>\n            </ion-item>\n          </ion-col>\n          <ion-col col-6>\n            <ion-item no-lines>\n              <ion-input type="text" [(ngModel)]="cvv" size="4" placeholder="CVV"></ion-input>\n            </ion-item>\n          </ion-col>\n        </ion-row>\n      </ion-grid>\n      <button ion-button block (click)="saveCard()">Save Card</button>\n    </div>\n    <div *ngSwitchCase="\'ridehistroy\'" padding>\n      <ion-card *ngFor="let trip of trips">\n        <ion-card-content>\n          <p>{{trip.$key}}</p>\n          <ion-row>\n            <ion-col>\n              <b style="text-align:center">FROM</b> \n              <p>{{ trip.origin.vicinity }} <br/> <ion-note>{{ trip.pickedUpAt | amDateFormat: \'YYYY-MM-DD HH:mm\'}}</ion-note></p>\n            </ion-col>\n            <ion-col>\n                <b style="text-align:center">TO</b> \n                <p>{{ trip.destination.vicinity }} <br/> <ion-note>{{ trip.droppedOffAt | amDateFormat: \'YYYY-MM-DD HH:mm\'}}</ion-note></p>\n            </ion-col>\n          </ion-row>\n          <p>Payment Mode: {{ trip.paymentMethod }}</p>\n          <p>Fee: {{trip.currency}} {{trip.fee}} * {{ trip.promo}} {{trip.discount}} % = {{ trip.fee - (trip.fee * trip.discount / 100) }}</p>\n        </ion-card-content>\n      </ion-card>\n    </div>\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Ionic\RushPack\rider\src\pages\user\user.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__services_trip_service__["a" /* TripService */]])
    ], UserPage);
    return UserPage;
}());

//# sourceMappingURL=user.js.map

/***/ }),

/***/ 162:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DriverService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(94);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DriverService = (function () {
    function DriverService(db) {
        this.db = db;
    }
    // get driver by id
    DriverService.prototype.getDriver = function (id) {
        return this.db.object('drivers/' + id);
    };
    // get driver position
    DriverService.prototype.getDriverPosition = function (locality, vehicleType, id) {
        return this.db.object('localities/' + locality + '/' + vehicleType + '/' + id);
    };
    DriverService.prototype.getActiveDriver = function (locality, vehicleType) {
        return this.db.list('localities/' + locality + '/' + vehicleType);
    };
    // calculate vehicle angle
    DriverService.prototype.calcAngle = function (oldLat, oldLng, lat, lng) {
        var brng = Math.atan2(lat - oldLat, lng - oldLng);
        brng = brng * (180 / Math.PI);
        return brng;
    };
    // return icon suffix by angle
    DriverService.prototype.getIconWithAngle = function (vehicle) {
        var angle = this.calcAngle(vehicle.oldLat, vehicle.oldLng, vehicle.lat, vehicle.lng);
        if (angle >= -180 && angle <= -160) {
            return '_left';
        }
        if (angle > -160 && angle <= -110) {
            return '_bottom_left';
        }
        if (angle > -110 && angle <= -70) {
            return '_bottom';
        }
        if (angle > -70 && angle <= -20) {
            return '_bottom_right';
        }
        if (angle >= -20 && angle <= 20) {
            return '_right';
        }
        if (angle > 20 && angle <= 70) {
            return '_top_right';
        }
        if (angle > 70 && angle <= 110) {
            return '_top';
        }
        if (angle > 110 && angle <= 160) {
            return '_top_left';
        }
        if (angle > 160 && angle <= 180) {
            return '_left';
        }
    };
    DriverService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], DriverService);
    return DriverService;
}());

//# sourceMappingURL=driver-service.js.map

/***/ }),

/***/ 186:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 186;

/***/ }),

/***/ 230:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 230;

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterPage = (function () {
    function RegisterPage(nav, authService, alertCtrl, loadingCtrl) {
        this.nav = nav;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.email = "";
        this.password = "";
        this.name = "";
        this.phoneNumber = "";
    }
    RegisterPage.prototype.signup = function () {
        var _this = this;
        if (this.email.length == 0 || this.password.length == 0 || this.name.length == 0 || this.phoneNumber.length == 0) {
            this.alertCtrl.create({ subTitle: 'Invalid Credentials', buttons: ['ok'] }).present();
        }
        else {
            var loading_1 = this.loadingCtrl.create({ content: 'Creating Account...' });
            loading_1.present();
            this.authService.register(this.email, this.password, this.name, this.phoneNumber).subscribe(function (authData) {
                loading_1.dismiss();
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            }, function (error) {
                loading_1.dismiss();
                var alert = _this.alertCtrl.create({
                    message: error.message,
                    buttons: ['OK']
                });
                alert.present();
            });
        }
    };
    RegisterPage.prototype.login = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__login_login__["a" /* LoginPage */]);
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-register',template:/*ion-inline-start:"C:\Ionic\RushPack\rider\src\pages\register\register.html"*/'<ion-content>\n    <!-- Logo -->\n    <div padding text-center class="header">\n      <div class="logo secondary-bg">\n        <ion-icon name="ios-car" color="light"></ion-icon>\n      </div>\n      <h2 ion-text color="light">Register</h2>\n    </div>\n\n  <ion-list class="list-form" padding no-lines>\n    <ion-item>\n      <ion-input type="text" [(ngModel)]="name" placeholder="Your name"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input type="email" [(ngModel)]="email" placeholder="Email"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input type="tel" [(ngModel)]="phoneNumber" placeholder="Phone Number"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-input type="password" [(ngModel)]="password" placeholder="Password"></ion-input>\n    </ion-item>\n    <ion-item>\n      <button ion-button block padding (click)="signup()">\n          Create account\n      </button>\n    </ion-item>\n  </ion-list>\n</ion-content>\n<ion-footer>\n    <button ion-button clear block (click)="login()">ALREADY HAVE AN ACCOUNT?</button>\n</ion-footer>\n'/*ion-inline-end:"C:\Ionic\RushPack\rider\src\pages\register\register.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlacesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_place_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__map_map__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_trip_service__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/*
 Generated class for the PlacesPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var PlacesPage = (function () {
    function PlacesPage(nav, placeService, geolocation, loadingCtrl, navParams, tripService) {
        var _this = this;
        this.nav = nav;
        this.placeService = placeService;
        this.geolocation = geolocation;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.tripService = tripService;
        // all places
        this.places = [];
        // search keyword
        this.keyword = '';
        // page loaded flag
        this.pageLoaded = false;
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.lat = resp.coords.latitude;
            _this.lon = resp.coords.longitude;
            _this.search();
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    }
    // show search input
    PlacesPage.prototype.ionViewDidEnter = function () {
        this.pageLoaded = true;
    };
    // hide search input
    PlacesPage.prototype.ionViewWillLeave = function () {
        this.pageLoaded = false;
    };
    // choose a place
    PlacesPage.prototype.selectPlace = function (place) {
        console.log(place);
        if (this.navParams.get('type') == 'origin') {
            this.tripService.setOrigin(place.vicinity, place.geometry.location.lat, place.geometry.location.lng);
            console.log("origin set");
        }
        else {
            this.tripService.setDestination(place.vicinity, place.geometry.location.lat, place.geometry.location.lng);
            console.log("destination set");
        }
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    // clear search input
    PlacesPage.prototype.clear = function () {
        this.keyword = '';
        this.search();
    };
    // search by address
    PlacesPage.prototype.search = function () {
        var _this = this;
        this.showLoading();
        this.placeService.searchByAddress(this.keyword, this.lat, this.lon).subscribe(function (result) {
            _this.hideLoading();
            _this.places = result.results;
        });
        setTimeout(function () { _this.hideLoading(); }, 5000);
    };
    // calculate distance from a place to current position
    PlacesPage.prototype.calcDistance = function (place) {
        return this.placeService.calcCrow(place.geometry.location.lat, place.geometry.location.lng, this.lat, this.lon).toFixed(1);
    };
    PlacesPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    PlacesPage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    // open map page
    PlacesPage.prototype.openMap = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__map_map__["a" /* MapPage */], { type: this.navParams.get('type') });
    };
    PlacesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-places',template:/*ion-inline-start:"C:\Ionic\RushPack\rider\src\pages\places\places.html"*/'<ion-header>\n  <ion-navbar color="white">\n    <div class="search-bar">\n      <input type="text"\n             [(ngModel)]="keyword"\n             (change)="search($event)"\n             [hidden]="!pageLoaded"\n             autocorrect="off"\n             placeholder="Where are you going?">\n      <div class="close-btn" [hidden]="!keyword.length" (click)="clear()">\n        <ion-icon name="close"></ion-icon>\n      </div>\n    </div>\n    <ion-buttons end>\n      <button ion-button (click)="openMap()">\n        <ion-icon name="pin"></ion-icon>&nbsp; Pick\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="common-bg">\n  <p style="text-align:center;color:#bbb" *ngIf="places.length==0">No Places found; please make sure, your have proper permission;</p>\n  <ion-list>\n    <ion-item *ngFor="let place of places" (click)="selectPlace(place)">\n      <ion-icon name="ios-pin-outline" item-left>\n      </ion-icon>\n      <span class="item-icon-label">\n        {{ calcDistance(place) }} km\n      </span>\n      <div>\n        <div class="bold">{{ place.name }}</div>\n        <span>{{ place.vicinity }}</span>\n      </div>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"C:\Ionic\RushPack\rider\src\pages\places\places.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_place_service__["a" /* PlaceService */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_6__services_trip_service__["a" /* TripService */]])
    ], PlacesPage);
    return PlacesPage;
}());

//# sourceMappingURL=places.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_place_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_trip_service__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var MapPage = (function () {
    function MapPage(nav, geolocation, chRef, navParams, placeService, tripService) {
        this.nav = nav;
        this.geolocation = geolocation;
        this.chRef = chRef;
        this.navParams = navParams;
        this.placeService = placeService;
        this.tripService = tripService;
        // marker position on screen
        this.markerFromTop = 0;
        this.markerFromLeft = 0;
    }
    // Load map only after view is initialized
    MapPage.prototype.ionViewDidLoad = function () {
        this.loadMap();
        // set marker position in center of screen
        // minus marker's size
        this.markerFromTop = window.screen.height / 2 - 16;
        this.markerFromLeft = window.screen.width / 2 - 8;
    };
    MapPage.prototype.loadMap = function () {
        var _this = this;
        // set current location as map center
        this.geolocation.getCurrentPosition().then(function (resp) {
            var latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            _this.map = new google.maps.Map(document.getElementById('map'), {
                zoom: 16,
                center: latLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false
            });
            _this.marker = new google.maps.Marker({ map: _this.map, position: latLng });
            _this.marker.setMap(_this.map);
            // get center's address
            _this.findPlace(latLng);
            _this.map.addListener('center_changed', function (event) {
                var center = _this.map.getCenter();
                _this.findPlace(center);
            });
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    // find address by LatLng
    MapPage.prototype.findPlace = function (latLng) {
        var _this = this;
        var geocoder = new google.maps.Geocoder();
        this.marker.setMap(null);
        this.marker = new google.maps.Marker({ map: this.map, position: latLng });
        this.marker.setMap(this.map);
        geocoder.geocode({ 'latLng': latLng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                _this.address = results[0];
                _this.chRef.detectChanges();
            }
        });
    };
    // choose address and go back to home page
    MapPage.prototype.selectPlace = function () {
        var address = this.placeService.formatAddress(this.address);
        if (this.navParams.get('type') == 'origin') {
            this.tripService.setOrigin(address.vicinity, address.location.lat, address.location.lng);
        }
        else {
            this.tripService.setDestination(address.vicinity, address.location.lat, address.location.lng);
        }
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */]);
    };
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-map',template:/*ion-inline-start:"C:\Ionic\RushPack\rider\src\pages\map\map.html"*/'<ion-header>\n\n  <ion-navbar color="white">\n    <ion-title>{{ address ? address.formatted_address : \'\' }}</ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="selectPlace()">\n        Done\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <div #map id="map"></div>\n  <img class="marker" src="assets/img/pin.png" alt=""\n       [ngStyle]="{top: markerFromTop + \'px\', left: markerFromLeft + \'px\'}">\n</ion-content>\n'/*ion-inline-end:"C:\Ionic\RushPack\rider\src\pages\map\map.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__services_place_service__["a" /* PlaceService */], __WEBPACK_IMPORTED_MODULE_5__services_trip_service__["a" /* TripService */]])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentMethodPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_trip_service__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
 Generated class for the PaymentMethodPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
var PaymentMethodPage = (function () {
    function PaymentMethodPage(nav, authService, tripService, loadingCtrl) {
        var _this = this;
        this.nav = nav;
        this.authService = authService;
        this.tripService = tripService;
        this.loadingCtrl = loadingCtrl;
        this.carNumber = null;
        var loading = loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        authService.getCardSetting().take(1).subscribe(function (snapshot) {
            loading.dismiss();
            if (snapshot) {
                _this.carNumber = snapshot.number;
            }
        });
    }
    // apply change method
    PaymentMethodPage.prototype.changeMethod = function (method) {
        this.tripService.setPaymentMethod(method);
        // go back
        this.nav.pop();
    };
    PaymentMethodPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-payment-method',template:/*ion-inline-start:"C:\Ionic\RushPack\rider\src\pages\payment-method\payment-method.html"*/'<!--\n  Generated template for the PaymentMethodPage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Payment Methods</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-list class="list-full-border" radio-group>\n    <ion-item>\n      <ion-label>\n        Cash\n        <p class="text-hint">Use cash</p>\n      </ion-label>\n      <ion-radio value="cash" (click)="changeMethod(\'cash\')"></ion-radio>\n    </ion-item>\n\n    <ion-item *ngIf="carNumber">\n      <ion-label>\n        Card\n        <p class="text-hint">{{ carNumber }}</p>\n      </ion-label>\n      <ion-radio value="card" (click)="changeMethod(\'card\')"></ion-radio>\n    </ion-item>\n\n  </ion-list>\n\n  <div padding *ngIf="!carNumber">\n    <button ion-button block color="primary" (click)="addCard()">Add payment method</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"C:\Ionic\RushPack\rider\src\pages\payment-method\payment-method.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_3__services_trip_service__["a" /* TripService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], PaymentMethodPage);
    return PaymentMethodPage;
}());

//# sourceMappingURL=payment-method.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrackingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_driver_service__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_trip_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_constants__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_place_service__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TrackingPage = (function () {
    function TrackingPage(nav, driverService, platform, navParams, tripService, placeService, modalCtrl, alertCtrl) {
        this.nav = nav;
        this.driverService = driverService;
        this.platform = platform;
        this.navParams = navParams;
        this.tripService = tripService;
        this.placeService = placeService;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.trip = {};
        this.alertCnt = 0;
        this.sos = __WEBPACK_IMPORTED_MODULE_5__services_constants__["j" /* SOS */];
    }
    TrackingPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var tripId;
        if (this.navParams.get('tripId'))
            tripId = this.navParams.get('tripId');
        else
            tripId = this.tripService.getId();
        this.tripService.getTrip(tripId).take(1).subscribe(function (snapshot) {
            _this.trip = snapshot;
            _this.driverService.getDriver(snapshot.driverId).take(1).subscribe(function (snap) {
                console.log(snap);
                _this.driver = snap;
                _this.watchTrip(tripId);
                // init map
                _this.loadMap();
            });
        });
    };
    TrackingPage.prototype.ionViewWillLeave = function () {
        clearInterval(this.driverTracking);
    };
    TrackingPage.prototype.watchTrip = function (tripId) {
        var _this = this;
        this.tripService.getTrip(tripId).subscribe(function (snapshot) {
            _this.tripStatus = snapshot.status;
        });
    };
    TrackingPage.prototype.showRateCard = function () {
        var _this = this;
        var final = this.trip.fee - (this.trip.fee * (parseInt(this.trip.discount) / 100));
        var message = '<p>Fee: ' + this.trip.fee + '<br>Promo: ' + this.trip.discount + '<br> Discount (%): ' + this.trip.discount + '</p><h2>' + final + '</h3>';
        this.alertCtrl.create({
            title: 'Final Price (' + this.trip.currency + ')',
            message: message,
            enableBackdropDismiss: false,
            buttons: [{
                    text: 'Rate Trip',
                    handler: function (data) {
                        _this.showRatingAlert();
                    }
                }],
        }).present();
    };
    TrackingPage.prototype.showRatingAlert = function () {
        var _this = this;
        console.log(this.trip, this.driver);
        var alert = this.alertCtrl.create({
            title: 'Rate Trip',
            enableBackdropDismiss: false
        });
        alert.addInput({ type: 'radio', label: 'Excellent', value: '5', checked: true });
        alert.addInput({ type: 'radio', label: 'Good', value: '4' });
        alert.addInput({ type: 'radio', label: 'OK', value: '3' });
        alert.addInput({ type: 'radio', label: 'Bad', value: '2' });
        alert.addInput({ type: 'radio', label: 'Worst', value: '1' });
        alert.addButton({ text: 'Cancel', handler: function () {
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            } });
        alert.addButton({
            text: 'OK',
            handler: function (data) {
                _this.tripService.rateTrip(_this.trip.$key, data).then(function () {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
                });
            }
        });
        alert.present();
    };
    TrackingPage.prototype.loadMap = function () {
        var latLng = new google.maps.LatLng(this.trip.origin.location.lat, this.trip.origin.location.lng);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false
        };
        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });
        this.trackDriver();
    };
    // make array with range is n
    TrackingPage.prototype.range = function (n) {
        return new Array(Math.round(n));
    };
    TrackingPage.prototype.trackDriver = function () {
        var _this = this;
        this.showDriverOnMap();
        this.driverTracking = setInterval(function () {
            _this.marker.setMap(null);
            _this.showDriverOnMap();
        }, __WEBPACK_IMPORTED_MODULE_5__services_constants__["h" /* POSITION_INTERVAL */]);
        console.log(__WEBPACK_IMPORTED_MODULE_5__services_constants__["h" /* POSITION_INTERVAL */]);
    };
    TrackingPage.prototype.cancelTrip = function () {
        var _this = this;
        this.tripService.cancelTrip(this.trip.$key).then(function (data) {
            console.log(data);
            _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
        });
    };
    // show user on map
    TrackingPage.prototype.showDriverOnMap = function () {
        var _this = this;
        // get user's position
        this.driverService.getDriverPosition(this.placeService.getLocality(), this.driver.type, this.driver.$key).take(1).subscribe(function (snapshot) {
            // create or update
            var latLng = new google.maps.LatLng(snapshot.lat, snapshot.lng);
            if (_this.tripStatus == __WEBPACK_IMPORTED_MODULE_5__services_constants__["k" /* TRIP_STATUS_GOING */]) {
                console.log(_this.tripStatus);
                _this.map.setCenter(latLng);
            }
            // show vehicle to map
            _this.marker = new google.maps.Marker({
                map: _this.map,
                position: latLng,
                icon: {
                    url: 'assets/img/icon/suv_right.png',
                    size: new google.maps.Size(32, 32),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(16, 16),
                    scaledSize: new google.maps.Size(32, 32)
                },
            });
        });
    };
    TrackingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-tracking',template:/*ion-inline-start:"C:\Ionic\RushPack\rider\src\pages\tracking\tracking.html"*/'<ion-header>\n  <ion-navbar color="primary">\n    <ion-title>Driver on the way</ion-title>\n    <ion-buttons end>\n      <button ion-button *ngIf="tripStatus == \'finished\'"  (click)="showRateCard()">FINISH TRIP</button>\n      <button ion-button *ngIf="tripStatus == \'waiting\'" (click)="cancelTrip()">CANCEL TRIP</button>\n      <a href="tel:{{sos}}" ion-button *ngIf="tripStatus == \'going\'">SOS</a>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div id="map"></div>\n</ion-content>\n<ion-footer>\n    <div style="float:right;background:yellow; color: #222">OTP: {{trip.otp}}</div>\n    <ion-item>\n      <ion-avatar item-left>\n          <img src="{{ (driver)?.photoURL }}"/>\n      </ion-avatar>\n      <h2>{{ (driver)?.name }} &nbsp; {{(driver)?.rating}} <ion-icon name="md-star" color="yellow"></ion-icon> </h2>\n      <p>{{ (driver)?.plate }} &middot; {{ (driver)?.brand }}</p>\n      <a item-right ion-button clear href="tel:(driver)?.phoneNumber\')">\n        <ion-icon name="call"></ion-icon>&nbsp;CALL\n      </a>\n    </ion-item>\n</ion-footer>\n'/*ion-inline-end:"C:\Ionic\RushPack\rider\src\pages\tracking\tracking.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_driver_service__["a" /* DriverService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__services_trip_service__["a" /* TripService */], __WEBPACK_IMPORTED_MODULE_6__services_place_service__["a" /* PlaceService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], TrackingPage);
    return TrackingPage;
}());

//# sourceMappingURL=tracking.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DealService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database_database__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_service__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DealService = (function () {
    function DealService(db, authService) {
        this.db = db;
        this.authService = authService;
    }
    // sort driver by rating & distance
    DealService.prototype.sortDriversList = function (drivers) {
        return drivers.sort(function (a, b) {
            return (a.rating - a.distance / 5) - (b.rating - b.distance / 5);
        });
    };
    // make deal to driver
    DealService.prototype.makeDeal = function (driverId, origin, destination, distance, fee, currency, note, paymentMethod, promocode, discount) {
        var user = this.authService.getUserData();
        return this.db.object('deals/' + driverId).set({
            passengerId: user.uid,
            currency: currency,
            origin: origin,
            destination: destination,
            distance: distance,
            fee: fee,
            note: note,
            paymentMethod: paymentMethod,
            status: __WEBPACK_IMPORTED_MODULE_2__constants__["b" /* DEAL_STATUS_PENDING */],
            createdAt: Date.now(),
            promocode: promocode,
            discount: discount
        });
    };
    // get deal by driverId
    DealService.prototype.getDriverDeal = function (driverId) {
        return this.db.object('deals/' + driverId);
    };
    // remove deal
    DealService.prototype.removeDeal = function (driverId) {
        return this.db.object('deals/' + driverId).remove();
    };
    DealService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */]])
    ], DealService);
    return DealService;
}());

//# sourceMappingURL=deal-service.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(94);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SettingService = (function () {
    function SettingService(db) {
        this.db = db;
    }
    SettingService.prototype.getPrices = function () {
        return this.db.object('master_settings/prices');
    };
    SettingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], SettingService);
    return SettingService;
}());

//# sourceMappingURL=setting-service.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_take__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_take___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_take__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__constants__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AuthService = (function () {
    function AuthService(afAuth, db, storage) {
        this.afAuth = afAuth;
        this.db = db;
        this.storage = storage;
    }
    // get current user data from firebase
    AuthService.prototype.getUserData = function () {
        return this.afAuth.auth.currentUser;
    };
    // get passenger by id
    AuthService.prototype.getUser = function (id) {
        return this.db.object('passengers/' + id);
    };
    // login by email and password
    AuthService.prototype.login = function (email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    };
    AuthService.prototype.logout = function () {
        return this.afAuth.auth.signOut();
    };
    // register new account
    AuthService.prototype.register = function (email, password, name, phoneNumber) {
        var _this = this;
        return __WEBPACK_IMPORTED_MODULE_4_rxjs_Observable__["Observable"].create(function (observer) {
            _this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(function (authData) {
                authData.name = name;
                authData.phoneNumber = phoneNumber;
                authData.isPhoneVerified = false;
                if (__WEBPACK_IMPORTED_MODULE_6__constants__["d" /* EMAIL_VERIFICATION_ENABLED */] === true)
                    _this.getUserData().sendEmailVerification();
                // update passenger object
                _this.updateUserProfile(authData);
                observer.next();
            }).catch(function (error) {
                if (error) {
                    observer.error(error);
                }
            });
        });
    };
    // update user display name and photo
    AuthService.prototype.updateUserProfile = function (user) {
        console.log(user);
        var name = user.name ? user.name : user.email;
        var photoUrl = user.photoURL ? user.photoURL : __WEBPACK_IMPORTED_MODULE_6__constants__["c" /* DEFAULT_AVATAR */];
        this.getUserData().updateProfile({
            displayName: name,
            photoURL: photoUrl
        });
        // create or update passenger
        this.db.object('passengers/' + user.uid).update({
            name: name,
            photoURL: photoUrl,
            email: user.email,
            phoneNumber: user.phoneNumber ? user.phoneNumber : '',
            isPhoneVerified: user.isPhoneVerified
        });
    };
    // create new user if not exist
    AuthService.prototype.createUserIfNotExist = function (user) {
        var _this = this;
        // check if user does not exist
        this.getUser(user.uid).take(1).subscribe(function (snapshot) {
            if (snapshot.$value === null) {
                // update passenger object
                _this.updateUserProfile(user);
            }
        });
    };
    // update card setting
    AuthService.prototype.updateCardSetting = function (number, exp, cvv, token) {
        var user = this.getUserData();
        this.db.object('passengers/' + user.uid + '/card').update({
            number: number,
            exp: exp,
            cvv: cvv,
            token: token
        });
    };
    // get card setting
    AuthService.prototype.getCardSetting = function () {
        var user = this.getUserData();
        return this.db.object('passengers/' + user.uid + '/card');
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_1_angularfire2_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth-service.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__places_places__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__payment_method_payment_method__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_user__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tracking_tracking__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_place_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_deal_service__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_setting_service__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_driver_service__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_trip_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_constants__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_Rx__ = __webpack_require__(578);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth_auth__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_firebase__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_16_firebase__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


















var HomePage = (function () {
    function HomePage(nav, platform, alertCtrl, placeService, geolocation, chRef, loadingCtrl, settingService, tripService, driverService, afAuth, authService, dealService) {
        var _this = this;
        this.nav = nav;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.placeService = placeService;
        this.geolocation = geolocation;
        this.chRef = chRef;
        this.loadingCtrl = loadingCtrl;
        this.settingService = settingService;
        this.tripService = tripService;
        this.driverService = driverService;
        this.afAuth = afAuth;
        this.authService = authService;
        this.dealService = dealService;
        this.mapId = Math.random() + 'map';
        this.mapHeight = 480;
        this.showModalBg = false;
        this.showVehicles = false;
        this.vehicles = [];
        this.note = '';
        this.promocode = '';
        this.distance = 0;
        this.duration = 0;
        this.paymentMethod = 'cash';
        this.activeDrivers = [];
        this.driverMarkers = [];
        this.locateDriver = false;
        this.user = {};
        this.isTrackDriverEnabled = true;
        this.discount = 0;
        this.distanceText = '';
        this.durationText = '';
        // this.translate.setDefaultLang('en');
        this.origin = tripService.getOrigin();
        this.destination = tripService.getDestination();
        afAuth.authState.subscribe(function (authData) {
            if (authData) {
                _this.user = authService.getUserData();
            }
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // on view ready, start loading map
        this.tripService.getTrips().subscribe(function (trips) {
            console.log(trips);
            trips.forEach(function (trip) {
                console.log(trip.status);
                if (trip.status == 'waiting' || trip.status == 'accepted' || trip.status == 'going') {
                    _this.isTrackDriverEnabled = false;
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__tracking_tracking__["a" /* TrackingPage */], { tripId: trip.$key });
                }
            });
        });
        //this.calcRoute();
        this.loadMap();
    };
    HomePage.prototype.ionViewWillLeave = function () {
        // stop tracking driver
        clearInterval(this.driverTracking);
    };
    // get current payment method from service
    HomePage.prototype.getPaymentMethod = function () {
        this.paymentMethod = this.tripService.getPaymentMethod();
        return this.paymentMethod;
    };
    HomePage.prototype.choosePaymentMethod1 = function () {
        var _this = this;
        var alert = this.alertCtrl.create({ message: 'Profile -> Payments to add card' });
        alert.addInput({ type: 'radio', label: 'Cash', value: 'cash', checked: true });
        this.authService.getCardSetting().take(1).subscribe(function (snapshot) {
            if (snapshot) {
                _this.cardNumber = snapshot.number;
                if (_this.cardNumber != null || _this.cardNumber != undefined)
                    alert.addInput({ type: 'radio', label: 'Credit Card', value: 'card' });
            }
        });
        alert.addButton({ text: 'Cancel' });
        alert.addButton({
            text: 'Ok',
            handler: function (data) {
                console.log(data);
                _this.tripService.setPaymentMethod(data);
            }
        });
        alert.present();
    };
    // toggle active vehicle
    HomePage.prototype.chooseVehicle = function (index) {
        for (var i = 0; i < this.vehicles.length; i++) {
            this.vehicles[i].active = (i == index);
            // choose this vehicle type
            if (i == index) {
                this.tripService.setVehicle(this.vehicles[i]);
                this.currentVehicle = this.vehicles[i];
            }
        }
        // start tracking new driver type
        this.trackDrivers();
        this.toggleVehicles();
    };
    HomePage.prototype.goProfilePage = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_5__user_user__["a" /* UserPage */], { user: this.user });
    };
    // load map
    HomePage.prototype.loadMap = function () {
        var _this = this;
        this.showLoading();
        // get current location
        return this.geolocation.getCurrentPosition().then(function (resp) {
            if (_this.origin)
                _this.startLatLng = new google.maps.LatLng(_this.origin.location.lat, _this.origin.location.lng);
            else
                _this.startLatLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            var directionsDisplay;
            var directionsService = new google.maps.DirectionsService();
            directionsDisplay = new google.maps.DirectionsRenderer();
            _this.map = new google.maps.Map(document.getElementById(_this.mapId), {
                zoom: 15,
                center: _this.startLatLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                zoomControl: false,
                streetViewControl: false,
            });
            var mapx = _this.map;
            directionsDisplay.setMap(mapx);
            // find map center address
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({ 'latLng': _this.map.getCenter() }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (!_this.origin) {
                        // set map center as origin
                        _this.origin = _this.placeService.formatAddress(results[0]);
                        _this.tripService.setOrigin(_this.origin.vicinity, _this.origin.location.lat, _this.origin.location.lng);
                        _this.setOrigin();
                        _this.chRef.detectChanges();
                    }
                    else {
                        _this.setOrigin();
                    }
                    // save locality
                    var locality_1 = _this.placeService.setLocalityFromGeocoder(results);
                    console.log('locality', locality_1);
                    // load list vehicles
                    _this.settingService.getPrices().subscribe(function (snapshot) {
                        console.log(snapshot);
                        var obj = snapshot[locality_1] ? snapshot[locality_1] : snapshot.default;
                        console.log(obj);
                        _this.currency = obj.currency;
                        _this.tripService.setCurrency(_this.currency);
                        // calculate price
                        Object.keys(obj.vehicles).forEach(function (id) {
                            obj.vehicles[id].id = id;
                            _this.vehicles.push(obj.vehicles[id]);
                        });
                        // calculate distance between origin adn destination
                        if (_this.destination) {
                            _this.placeService.getDirection(_this.origin.location.lat, _this.origin.location.lng, _this.destination.location.lat, _this.destination.location.lng).subscribe(function (result) {
                                console.log(result);
                                if (result.routes.length != 0) {
                                    _this.distance = result.routes[0].legs[0].distance.value;
                                    _this.distanceText = result.routes[0].legs[0].distance.text;
                                    _this.durationText = result.routes[0].legs[0].duration.text;
                                    for (var i = 0; i < _this.vehicles.length; i++) {
                                        _this.vehicles[i].fee = _this.distance * _this.vehicles[i].price / 1000;
                                        _this.vehicles[i].fee = _this.vehicles[i].fee.toFixed(2);
                                    }
                                }
                                else {
                                    _this.alertCtrl.create({
                                        subTitle: 'No Driver Found',
                                        buttons: ['OK']
                                    }).present();
                                }
                            });
                        }
                        // set first device as default
                        _this.vehicles[0].active = true;
                        _this.currentVehicle = _this.vehicles[0];
                        _this.locality = locality_1;
                        if (_this.isTrackDriverEnabled)
                            _this.trackDrivers();
                    });
                }
            });
            // add destination to map
            if (_this.destination) {
                _this.destLatLng = new google.maps.LatLng(_this.destination.location.lat, _this.destination.location.lng);
                var bounds = new google.maps.LatLngBounds();
                bounds.extend(_this.startLatLng);
                bounds.extend(_this.destLatLng);
                mapx.fitBounds(bounds);
                var request = {
                    origin: _this.startLatLng,
                    destination: _this.destLatLng,
                    travelMode: google.maps.TravelMode.DRIVING
                };
                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        console.log(response);
                        directionsDisplay.setDirections(response);
                        directionsDisplay.setMap(mapx);
                    }
                    else {
                        console.log("error");
                    }
                });
            }
            _this.hideLoading();
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
    };
    HomePage.prototype.showPromoPopup = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Enter Promo code',
            message: "",
            inputs: [
                {
                    name: 'promocode',
                    placeholder: 'Enter Promo Code'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Apply',
                    handler: function (data) {
                        console.log(data.promocode);
                        //verifying promocode
                        __WEBPACK_IMPORTED_MODULE_16_firebase__["database"]().ref('promocodes').orderByChild("code").equalTo(data.promocode).once('value', function (promocodes) {
                            console.log(promocodes.val());
                            var tmp = [];
                            promocodes.forEach(function (promo) {
                                tmp.push(__assign({ key: promo.key }, promo.val()));
                                return false;
                            });
                            tmp = tmp[0];
                            console.log(tmp);
                            if (promocodes.val() != null || promocodes.val() != undefined) {
                                _this.promocode = tmp.code;
                                _this.discount = tmp.discount;
                                _this.tripService.setPromo(tmp.code);
                                _this.tripService.setDiscount(tmp.discount);
                                console.log('promo applied', tmp.code, tmp.discount);
                            }
                        }, function (err) { return console.log(err); });
                    }
                }
            ]
        });
        prompt.present();
    };
    // Show note popup when click to 'Notes to user'
    HomePage.prototype.showNotePopup = function () {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Notes to user',
            message: "",
            inputs: [
                {
                    name: 'note',
                    placeholder: 'Note'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        _this.note = data;
                        _this.tripService.setNote(data);
                        console.log('Saved clicked');
                    }
                }
            ]
        });
        prompt.present();
    };
    ;
    // go to next view when the 'Book' button is clicked
    HomePage.prototype.book = function () {
        this.locateDriver = true;
        // store detail
        this.tripService.setAvailableDrivers(this.activeDrivers);
        this.tripService.setDistance(this.distance);
        this.tripService.setFee(this.currentVehicle.fee);
        this.tripService.setIcon(this.currentVehicle.icon);
        this.tripService.setNote(this.note);
        this.tripService.setPromo(this.promocode);
        this.tripService.setDiscount(this.discount);
        // this.tripService.setPaymentMethod('');
        this.drivers = this.tripService.getAvailableDrivers();
        // sort by driver distance and rating
        this.drivers = this.dealService.sortDriversList(this.drivers);
        if (this.drivers) {
            this.makeDeal(0);
        }
    };
    HomePage.prototype.makeDeal = function (index) {
        var _this = this;
        var driver = this.drivers[index];
        var dealAccepted = false;
        if (driver) {
            driver.status = 'Bidding';
            this.dealService.getDriverDeal(driver.$key).take(1).subscribe(function (snapshot) {
                // if user is available
                if (snapshot.$value === null) {
                    // create a record
                    console.log(snapshot);
                    _this.dealService.makeDeal(driver.$key, _this.tripService.getOrigin(), _this.tripService.getDestination(), _this.tripService.getDistance(), _this.tripService.getFee(), _this.tripService.getCurrency(), _this.tripService.getNote(), _this.tripService.getPaymentMethod(), _this.tripService.getPromo(), _this.tripService.getDiscount()).then(function () {
                        var sub = _this.dealService.getDriverDeal(driver.$key).subscribe(function (snap) {
                            // if record doesn't exist or is accepted
                            if (snap.$value === null || snap.status != __WEBPACK_IMPORTED_MODULE_12__services_constants__["b" /* DEAL_STATUS_PENDING */]) {
                                sub.unsubscribe();
                                // if deal has been cancelled
                                if (snap.$value === null) {
                                    _this.nextDriver(index);
                                }
                                else if (snap.status == __WEBPACK_IMPORTED_MODULE_12__services_constants__["a" /* DEAL_STATUS_ACCEPTED */]) {
                                    // if deal is accepted
                                    console.log('accepted', snap.tripId);
                                    dealAccepted = true;
                                    _this.drivers = [];
                                    _this.tripService.setId(snap.tripId);
                                    // go to user page
                                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__tracking_tracking__["a" /* TrackingPage */]);
                                }
                            }
                        });
                    });
                }
                else {
                    _this.nextDriver(index);
                }
            });
        }
        else {
            // show error & try again button
            console.log('No user found');
            this.locateDriver = false;
            this.alertCtrl.create({
                subTitle: 'No Driver Found',
                buttons: ['OK']
            }).present();
        }
    };
    // make deal to next driver
    HomePage.prototype.nextDriver = function (index) {
        this.drivers.splice(index, 1);
        this.makeDeal(index);
    };
    // choose origin place
    HomePage.prototype.chooseOrigin = function () {
        // go to places page
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__places_places__["a" /* PlacesPage */], { type: 'origin' });
    };
    // choose destination place
    HomePage.prototype.chooseDestination = function () {
        // go to places page
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__places_places__["a" /* PlacesPage */], { type: 'destination' });
    };
    // choose payment method
    HomePage.prototype.choosePaymentMethod = function () {
        // go to payment method page
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__payment_method_payment_method__["a" /* PaymentMethodPage */]);
    };
    // add origin marker to map
    HomePage.prototype.setOrigin = function () {
        // add origin and destination marker
        var latLng = new google.maps.LatLng(this.origin.location.lat, this.origin.location.lng);
        var startMarker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });
        startMarker.setMap(this.map);
        if (this.destination)
            startMarker.setMap(null);
        // set map center to origin address
        this.map.setCenter(latLng);
    };
    HomePage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    HomePage.prototype.hideLoading = function () {
        this.loading.dismiss();
    };
    // show or hide vehicles
    HomePage.prototype.toggleVehicles = function () {
        this.showVehicles = !this.showVehicles;
        this.showModalBg = (this.showVehicles == true);
    };
    // track drivers
    HomePage.prototype.trackDrivers = function () {
        var _this = this;
        this.showDriverOnMap(this.locality);
        clearInterval(this.driverTracking);
        this.driverTracking = setInterval(function () {
            _this.showDriverOnMap(_this.locality);
        }, __WEBPACK_IMPORTED_MODULE_12__services_constants__["h" /* POSITION_INTERVAL */]);
        console.log(__WEBPACK_IMPORTED_MODULE_12__services_constants__["h" /* POSITION_INTERVAL */]);
    };
    // show drivers on map
    HomePage.prototype.showDriverOnMap = function (locality) {
        var _this = this;
        // get active drivers
        this.driverService.getActiveDriver(locality, this.currentVehicle.id).take(1).subscribe(function (snapshot) {
            console.log('fresh vehicles');
            console.log(snapshot);
            // clear vehicles
            _this.clearDrivers();
            // only show near vehicle
            snapshot.forEach(function (vehicle) {
                console.log(vehicle);
                // only show vehicle which has last active < 30 secs & distance < 5km
                var distance = _this.placeService.calcCrow(vehicle.lat, vehicle.lng, _this.origin.location.lat, _this.origin.location.lng);
                console.log(distance);
                console.log("distance:" + distance + " Last Active: " + (Date.now() - vehicle.last_active));
                // checking last active time and distance
                if (distance < __WEBPACK_IMPORTED_MODULE_12__services_constants__["i" /* SHOW_VEHICLES_WITHIN */] && Date.now() - vehicle.last_active < __WEBPACK_IMPORTED_MODULE_12__services_constants__["l" /* VEHICLE_LAST_ACTIVE_LIMIT */]) {
                    // create or update
                    var latLng = new google.maps.LatLng(vehicle.lat, vehicle.lng);
                    var angle = _this.driverService.getIconWithAngle(vehicle);
                    var marker = new google.maps.Marker({
                        map: _this.map,
                        position: latLng,
                        icon: {
                            url: 'assets/img/icon/' + _this.currentVehicle.icon + angle + '.png',
                            size: new google.maps.Size(32, 32),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(16, 16),
                            scaledSize: new google.maps.Size(32, 32)
                        },
                    });
                    // add vehicle and marker to the list
                    vehicle.distance = distance;
                    console.log(marker);
                    _this.driverMarkers.push(marker);
                    _this.activeDrivers.push(vehicle);
                }
                else {
                    console.log('This vehicle is too far');
                }
            });
        });
    };
    // clear expired drivers on the map
    HomePage.prototype.clearDrivers = function () {
        this.activeDrivers = [];
        this.driverMarkers.forEach(function (vehicle) {
            vehicle.setMap(null);
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Ionic\RushPack\rider\src\pages\home\home.html"*/'<ion-content>\n  <div id="{{ mapId }}" [ngStyle]="{height: \'85%\'}"></div>\n  <ion-list>\n      <ion-item>\n        <ion-label>From</ion-label>\n        <ion-input type="text"></ion-input>\n        <button ion-button item-right>Pick</button>\n      </ion-item>\n    </ion-list>\n  <!--Choose origin and destination places-->\n  <div class="map-overlay">\n    <div style="top:0; right: 0; padding: 4px;">\n        <button ion-button (click)="goProfilePage()"><ion-icon name="contact"></ion-icon></button>\n    </div>\n\n  </div>\n\n  <div class="align-bottom">\n      <ion-grid class="common-bg" [hidden]="!destination">\n          <ion-row>\n            <ion-col (click)="choosePaymentMethod1()">\n              <ion-icon name="ios-cash-outline" color="gray"></ion-icon>\n              <span ion-text color="gray">{{ getPaymentMethod() }}</span>\n            </ion-col>\n            <ion-col (click)="showPromoPopup()" *ngIf="destination">\n              <ion-icon name="ios-create-outline" color="gray"></ion-icon>\n              <span ion-text color="gray">Promo</span>\n            </ion-col>\n            <ion-col (click)="showNotePopup()">\n              <ion-icon name="ios-create-outline" color="gray"></ion-icon>\n              <span ion-text color="gray">Note</span>\n            </ion-col>\n          </ion-row>\n        </ion-grid>  \n    <ion-list no-lines>\n      <ion-item>\n        <ion-input disabled type="text" value="{{origin ? origin.vicinity : \'\' }}"></ion-input>\n        <button item-right (click)="chooseOrigin()"><ion-icon name="locate" class="search-icon"></ion-icon></button>\n      </ion-item>\n      <ion-item>\n        <ion-input disabled type="text" placeholder="where you want to go?" value="{{ destination ? destination.vicinity : \'\' }}"></ion-input>\n        <button item-right (click)="chooseDestination()"><ion-icon name="locate" class="search-icon"></ion-icon></button>\n      </ion-item>\n    </ion-list>\n    <ion-row>\n      <ion-col *ngIf="distanceText!=\'\'" ><ion-icon name="plane"></ion-icon> <b>{{ distanceText }}</b></ion-col>\n      <ion-col *ngIf="durationText!=\'\'"><ion-icon name="time"></ion-icon> <b>{{durationText}}</b></ion-col>\n    </ion-row>\n    <ion-row [hidden]="!destination">\n      <ion-col *ngFor="let vehicle of vehicles; let i = index" [ngClass]="{\'active\': vehicle.active}" (click)="chooseVehicle(i)">\n          <img src="assets/img/icon/{{ vehicle.icon }}.svg">\n          <p>{{ vehicle.name }} ( {{currency }}{{ vehicle.fee }} )</p>\n      </ion-col>\n    </ion-row>\n    <button ion-button block color="primary" [hidden]="destination" (click)="chooseDestination()">RIDE NOW</button>\n    <button ion-button block color="primary" [hidden]="!destination" (click)="book()">{{ locateDriver == false ? \'RIDE NOW\':\'Locating Drivers\'}} <ion-spinner name="dots" color="light" [hidden]="!locateDriver"></ion-spinner></button>\n  </div>\n</ion-content>'/*ion-inline-end:"C:\Ionic\RushPack\rider\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_7__services_place_service__["a" /* PlaceService */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_9__services_setting_service__["a" /* SettingService */],
            __WEBPACK_IMPORTED_MODULE_11__services_trip_service__["a" /* TripService */], __WEBPACK_IMPORTED_MODULE_10__services_driver_service__["a" /* DriverService */], __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_15__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_8__services_deal_service__["a" /* DealService */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return SHOW_VEHICLES_WITHIN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return POSITION_INTERVAL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return VEHICLE_LAST_ACTIVE_LIMIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DEAL_STATUS_PENDING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DEAL_STATUS_ACCEPTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return TRIP_STATUS_GOING; });
/* unused harmony export TRIP_STATUS_FINISHED */
/* unused harmony export DEAL_TIMEOUT */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return EMAIL_VERIFICATION_ENABLED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ENABLE_SIGNUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return SOS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return GOOGLE_MAP_API_KEY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return GOOGLE_MAP_BASE_URL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return DEFAULT_AVATAR; });
var SHOW_VEHICLES_WITHIN = 10; // within 5km
var POSITION_INTERVAL = 10000; // 2000ms
var VEHICLE_LAST_ACTIVE_LIMIT = 60000; // 60s
var DEAL_STATUS_PENDING = 'pending';
var DEAL_STATUS_ACCEPTED = 'accepted';
var TRIP_STATUS_GOING = 'going';
var TRIP_STATUS_FINISHED = 'finished';
var DEAL_TIMEOUT = 20000; // 20s
var EMAIL_VERIFICATION_ENABLED = true; // send verification email after user register
var ENABLE_SIGNUP = true;
var SOS = "+919500707757";
// NOTE: Please update your firebase configurations on src/app/app.module.ts
var GOOGLE_MAP_API_KEY = "AIzaSyA7MNmGM6-bW6QugXONZWdKZs8Y9eViI7E";
var GOOGLE_MAP_BASE_URL = "https://maps.googleapis.com/maps/api/";
var DEFAULT_AVATAR = "https://marketplace.canva.com/MAB2sqFKHu0/1/thumbnail/canva-business-people-design-person-icon--MAB2sqFKHu0.png";
//# sourceMappingURL=constants.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TripService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_database_database__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__place__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__auth_service__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TripService = (function () {
    function TripService(db, authService) {
        this.db = db;
        this.authService = authService;
        this.paymentMethod = 'cash';
        this.availableDrivers = [];
    }
    TripService.prototype.getAll = function () {
        return this.trips;
    };
    TripService.prototype.setId = function (id) {
        return this.id = id;
    };
    TripService.prototype.getId = function () {
        return this.id;
    };
    TripService.prototype.setCurrency = function (currency) {
        return this.currency = currency;
    };
    TripService.prototype.getCurrency = function () {
        return this.currency;
    };
    TripService.prototype.setOrigin = function (vicinity, lat, lng) {
        var place = new __WEBPACK_IMPORTED_MODULE_2__place__["a" /* Place */](vicinity, lat, lng);
        return this.origin = place.getFormatted();
    };
    TripService.prototype.getOrigin = function () {
        return this.origin;
    };
    TripService.prototype.setDestination = function (vicinity, lat, lng) {
        var place = new __WEBPACK_IMPORTED_MODULE_2__place__["a" /* Place */](vicinity, lat, lng);
        return this.destination = place.getFormatted();
    };
    TripService.prototype.getDestination = function () {
        return this.destination;
    };
    TripService.prototype.setDistance = function (distance) {
        return this.distance = distance;
    };
    TripService.prototype.getDistance = function () {
        return this.distance;
    };
    TripService.prototype.setFee = function (fee) {
        return this.fee = fee;
    };
    TripService.prototype.getFee = function () {
        return this.fee;
    };
    TripService.prototype.setNote = function (note) {
        return this.note = note;
    };
    TripService.prototype.getNote = function () {
        return this.note;
    };
    TripService.prototype.setPromo = function (promocode) {
        return this.promocode = promocode;
    };
    TripService.prototype.getPromo = function () {
        return this.promocode;
    };
    TripService.prototype.setDiscount = function (discount) {
        return this.discount = discount;
    };
    TripService.prototype.getDiscount = function () {
        return this.discount;
    };
    TripService.prototype.setPaymentMethod = function (method) {
        return this.paymentMethod = method;
    };
    TripService.prototype.getPaymentMethod = function () {
        return this.paymentMethod;
    };
    TripService.prototype.setVehicle = function (vehicle) {
        return this.vehicle = vehicle;
    };
    TripService.prototype.getVehicle = function () {
        return this.vehicle;
    };
    TripService.prototype.setIcon = function (icon) {
        return this.icon = icon;
    };
    TripService.prototype.getIcon = function () {
        return this.icon;
    };
    TripService.prototype.setAvailableDrivers = function (vehicles) {
        console.log(vehicles);
        this.availableDrivers = vehicles;
    };
    TripService.prototype.getAvailableDrivers = function () {
        return this.availableDrivers;
    };
    TripService.prototype.getTrip = function (id) {
        return this.db.object('trips/' + id);
    };
    TripService.prototype.getTrips = function () {
        var user = this.authService.getUserData();
        console.log(user);
        return this.db.list('trips', {
            query: {
                orderByChild: 'passengerId',
                equalTo: user.uid
            }
        });
    };
    TripService.prototype.cancelTrip = function (id) {
        return this.db.object('trips/' + id).update({ status: 'canceled' });
    };
    TripService.prototype.rateTrip = function (tripId, stars) {
        return this.db.object('trips/' + tripId).update({
            rating: parseInt(stars)
        });
    };
    TripService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_database_database__["a" /* AngularFireDatabase */], __WEBPACK_IMPORTED_MODULE_3__auth_service__["a" /* AuthService */]])
    ], TripService);
    return TripService;
}());

//# sourceMappingURL=trip-service.js.map

/***/ }),

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(516);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 516:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__(553);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2__ = __webpack_require__(845);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angular2_moment__ = __webpack_require__(846);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_driver_service__ = __webpack_require__(162);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_place_service__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_trip_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_setting_service__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_deal_service__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_login_login__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_payment_method_payment_method__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_places_places__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_register_register__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_tracking_tracking__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_map_map__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_user_user__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









// Import the AF2 Module



// Import moment module

// import services














var firebaseConfig = {
    apiKey: "AIzaSyC0LtAbgJPABKTsPSSaZQzp27lkJhFJTNI",
    authDomain: "tracker-ed8c8.firebaseapp.com",
    databaseURL: "https://tracker-ed8c8.firebaseio.com",
    projectId: "tracker-ed8c8",
    storageBucket: "tracker-ed8c8.appspot.com",
    messagingSenderId: "980536398546"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_19__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_payment_method_payment_method__["a" /* PaymentMethodPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_places_places__["a" /* PlacesPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_tracking_tracking__["a" /* TrackingPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_user_user__["a" /* UserPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_9_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_10_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_12_angular2_moment__["MomentModule"],
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */], {
                    mode: 'md'
                }, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_19__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_payment_method_payment_method__["a" /* PaymentMethodPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_places_places__["a" /* PlacesPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_tracking_tracking__["a" /* TrackingPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_user_user__["a" /* UserPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_13__services_driver_service__["a" /* DriverService */],
                __WEBPACK_IMPORTED_MODULE_14__services_place_service__["a" /* PlaceService */],
                __WEBPACK_IMPORTED_MODULE_15__services_trip_service__["a" /* TripService */],
                __WEBPACK_IMPORTED_MODULE_16__services_setting_service__["a" /* SettingService */],
                __WEBPACK_IMPORTED_MODULE_17__services_deal_service__["a" /* DealService */],
                __WEBPACK_IMPORTED_MODULE_18__services_auth_service__["a" /* AuthService */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 553:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth_auth__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_user_user__ = __webpack_require__(160);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import pages





// end import pages
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, afAuth, authService) {
        var _this = this;
        this.afAuth = afAuth;
        this.authService = authService;
        this.user = {};
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
            // check for login stage, then redirect
            afAuth.authState.take(1).subscribe(function (authData) {
                if (authData) {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */]);
                }
                else {
                    _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */]);
                }
            });
            // get user data
            afAuth.authState.subscribe(function (authData) {
                if (authData) {
                    _this.user = authService.getUserData();
                }
            });
        });
    }
    // view current user profile
    MyApp.prototype.viewProfile = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_8__pages_user_user__["a" /* UserPage */], {
            user: this.user
        });
    };
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"C:\Ionic\RushPack\rider\src\app\app.html"*/'<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"C:\Ionic\RushPack\rider\src\app\app.html"*/,
            queries: {
                nav: new __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"]('content')
            }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_7__services_auth_service__["a" /* AuthService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 569:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Place; });
var Place = (function () {
    function Place(vicinity, lat, lng) {
        this.lat = lat;
        this.lng = lng;
        this.vicinity = vicinity;
    }
    // get place object with formatted data
    Place.prototype.getFormatted = function () {
        return {
            location: {
                lat: this.lat,
                lng: this.lng
            },
            vicinity: this.vicinity
        };
    };
    return Place;
}());

//# sourceMappingURL=place.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PlaceService = (function () {
    function PlaceService(http) {
        this.http = http;
        this.baseUrl = __WEBPACK_IMPORTED_MODULE_2__constants__["g" /* GOOGLE_MAP_BASE_URL */];
        this.apiKey = __WEBPACK_IMPORTED_MODULE_2__constants__["f" /* GOOGLE_MAP_API_KEY */];
    }
    // search by address
    PlaceService.prototype.searchByAddress = function (address, lat, lng) {
        var url = this.baseUrl + 'place/nearbysearch/json?key=' + this.apiKey
            + '&keyword=' + encodeURI(address)
            + '&location=' + lat + ',' + lng
            + '&radius=50000';
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    // get direction between to points
    PlaceService.prototype.getDirection = function (lat1, lon1, lat2, lon2) {
        var url = this.baseUrl + 'directions/json?'
            + 'origin=' + lat1 + ',' + lon1
            + '&destination=' + lat2 + ',' + lon2;
        return this.http.get(url).map(function (res) { return res.json(); });
    };
    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    PlaceService.prototype.calcCrow = function (lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = this.toRad(lat2 - lat1);
        var dLon = this.toRad(lon2 - lon1);
        lat1 = this.toRad(lat1);
        lat2 = this.toRad(lat2);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    };
    // Converts numeric degrees to radians
    PlaceService.prototype.toRad = function (value) {
        return value * Math.PI / 180;
    };
    /**
     * Convert geocoder address to place object
     * @param address: Geocoder address result
     * @returns {{location: {lat: any, lng: any}, vicinity: string}}
     */
    PlaceService.prototype.formatAddress = function (address) {
        console.log(address);
        var components = address.address_components;
        var vicinity = components[0].short_name + ', ' + components[1].short_name;
        return {
            location: {
                lat: address.geometry.location.lat(),
                lng: address.geometry.location.lng()
            },
            vicinity: vicinity
        };
    };
    // set locality from geocoder result
    // @param results: Geocoder array results
    PlaceService.prototype.setLocalityFromGeocoder = function (results) {
        var component;
        var address;
        for (var i = 0; i < results.length; i++) {
            address = results[i];
            for (var j = 0; j < address.address_components.length; j++) {
                component = address.address_components[j];
                // if (component.types[0] == 'administrative_area_level_2') {
                if (component.types[0] == 'locality') {
                    // escape firebase characters
                    var locality = component.short_name.replace(/[\%\.\#\$\/\[\]]/, '_');
                    this.setLocality(locality);
                    return locality;
                }
            }
        }
        return false;
    };
    PlaceService.prototype.setLocality = function (locality) {
        return this.locality = locality;
    };
    PlaceService.prototype.getLocality = function () {
        return this.locality;
    };
    PlaceService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], PlaceService);
    return PlaceService;
}());

//# sourceMappingURL=place-service.js.map

/***/ }),

/***/ 848:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 382,
	"./af.js": 382,
	"./ar": 383,
	"./ar-dz": 384,
	"./ar-dz.js": 384,
	"./ar-kw": 385,
	"./ar-kw.js": 385,
	"./ar-ly": 386,
	"./ar-ly.js": 386,
	"./ar-ma": 387,
	"./ar-ma.js": 387,
	"./ar-sa": 388,
	"./ar-sa.js": 388,
	"./ar-tn": 389,
	"./ar-tn.js": 389,
	"./ar.js": 383,
	"./az": 390,
	"./az.js": 390,
	"./be": 391,
	"./be.js": 391,
	"./bg": 392,
	"./bg.js": 392,
	"./bm": 393,
	"./bm.js": 393,
	"./bn": 394,
	"./bn.js": 394,
	"./bo": 395,
	"./bo.js": 395,
	"./br": 396,
	"./br.js": 396,
	"./bs": 397,
	"./bs.js": 397,
	"./ca": 398,
	"./ca.js": 398,
	"./cs": 399,
	"./cs.js": 399,
	"./cv": 400,
	"./cv.js": 400,
	"./cy": 401,
	"./cy.js": 401,
	"./da": 402,
	"./da.js": 402,
	"./de": 403,
	"./de-at": 404,
	"./de-at.js": 404,
	"./de-ch": 405,
	"./de-ch.js": 405,
	"./de.js": 403,
	"./dv": 406,
	"./dv.js": 406,
	"./el": 407,
	"./el.js": 407,
	"./en-au": 408,
	"./en-au.js": 408,
	"./en-ca": 409,
	"./en-ca.js": 409,
	"./en-gb": 410,
	"./en-gb.js": 410,
	"./en-ie": 411,
	"./en-ie.js": 411,
	"./en-nz": 412,
	"./en-nz.js": 412,
	"./eo": 413,
	"./eo.js": 413,
	"./es": 414,
	"./es-do": 415,
	"./es-do.js": 415,
	"./es-us": 416,
	"./es-us.js": 416,
	"./es.js": 414,
	"./et": 417,
	"./et.js": 417,
	"./eu": 418,
	"./eu.js": 418,
	"./fa": 419,
	"./fa.js": 419,
	"./fi": 420,
	"./fi.js": 420,
	"./fo": 421,
	"./fo.js": 421,
	"./fr": 422,
	"./fr-ca": 423,
	"./fr-ca.js": 423,
	"./fr-ch": 424,
	"./fr-ch.js": 424,
	"./fr.js": 422,
	"./fy": 425,
	"./fy.js": 425,
	"./gd": 426,
	"./gd.js": 426,
	"./gl": 427,
	"./gl.js": 427,
	"./gom-latn": 428,
	"./gom-latn.js": 428,
	"./gu": 429,
	"./gu.js": 429,
	"./he": 430,
	"./he.js": 430,
	"./hi": 431,
	"./hi.js": 431,
	"./hr": 432,
	"./hr.js": 432,
	"./hu": 433,
	"./hu.js": 433,
	"./hy-am": 434,
	"./hy-am.js": 434,
	"./id": 435,
	"./id.js": 435,
	"./is": 436,
	"./is.js": 436,
	"./it": 437,
	"./it.js": 437,
	"./ja": 438,
	"./ja.js": 438,
	"./jv": 439,
	"./jv.js": 439,
	"./ka": 440,
	"./ka.js": 440,
	"./kk": 441,
	"./kk.js": 441,
	"./km": 442,
	"./km.js": 442,
	"./kn": 443,
	"./kn.js": 443,
	"./ko": 444,
	"./ko.js": 444,
	"./ky": 445,
	"./ky.js": 445,
	"./lb": 446,
	"./lb.js": 446,
	"./lo": 447,
	"./lo.js": 447,
	"./lt": 448,
	"./lt.js": 448,
	"./lv": 449,
	"./lv.js": 449,
	"./me": 450,
	"./me.js": 450,
	"./mi": 451,
	"./mi.js": 451,
	"./mk": 452,
	"./mk.js": 452,
	"./ml": 453,
	"./ml.js": 453,
	"./mr": 454,
	"./mr.js": 454,
	"./ms": 455,
	"./ms-my": 456,
	"./ms-my.js": 456,
	"./ms.js": 455,
	"./my": 457,
	"./my.js": 457,
	"./nb": 458,
	"./nb.js": 458,
	"./ne": 459,
	"./ne.js": 459,
	"./nl": 460,
	"./nl-be": 461,
	"./nl-be.js": 461,
	"./nl.js": 460,
	"./nn": 462,
	"./nn.js": 462,
	"./pa-in": 463,
	"./pa-in.js": 463,
	"./pl": 464,
	"./pl.js": 464,
	"./pt": 465,
	"./pt-br": 466,
	"./pt-br.js": 466,
	"./pt.js": 465,
	"./ro": 467,
	"./ro.js": 467,
	"./ru": 468,
	"./ru.js": 468,
	"./sd": 469,
	"./sd.js": 469,
	"./se": 470,
	"./se.js": 470,
	"./si": 471,
	"./si.js": 471,
	"./sk": 472,
	"./sk.js": 472,
	"./sl": 473,
	"./sl.js": 473,
	"./sq": 474,
	"./sq.js": 474,
	"./sr": 475,
	"./sr-cyrl": 476,
	"./sr-cyrl.js": 476,
	"./sr.js": 475,
	"./ss": 477,
	"./ss.js": 477,
	"./sv": 478,
	"./sv.js": 478,
	"./sw": 479,
	"./sw.js": 479,
	"./ta": 480,
	"./ta.js": 480,
	"./te": 481,
	"./te.js": 481,
	"./tet": 482,
	"./tet.js": 482,
	"./th": 483,
	"./th.js": 483,
	"./tl-ph": 484,
	"./tl-ph.js": 484,
	"./tlh": 485,
	"./tlh.js": 485,
	"./tr": 486,
	"./tr.js": 486,
	"./tzl": 487,
	"./tzl.js": 487,
	"./tzm": 488,
	"./tzm-latn": 489,
	"./tzm-latn.js": 489,
	"./tzm.js": 488,
	"./uk": 490,
	"./uk.js": 490,
	"./ur": 491,
	"./ur.js": 491,
	"./uz": 492,
	"./uz-latn": 493,
	"./uz-latn.js": 493,
	"./uz.js": 492,
	"./vi": 494,
	"./vi.js": 494,
	"./x-pseudo": 495,
	"./x-pseudo.js": 495,
	"./yo": 496,
	"./yo.js": 496,
	"./zh-cn": 497,
	"./zh-cn.js": 497,
	"./zh-hk": 498,
	"./zh-hk.js": 498,
	"./zh-tw": 499,
	"./zh-tw.js": 499
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 848;

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register_register__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(161);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_constants__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginPage = (function () {
    function LoginPage(nav, authService, alertCtrl, loadingCtrl, toast) {
        this.nav = nav;
        this.authService = authService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toast = toast;
        this.email = "";
        this.password = "";
        this.isRegisterEnabled = true;
        this.isRegisterEnabled = __WEBPACK_IMPORTED_MODULE_6__services_constants__["e" /* ENABLE_SIGNUP */];
    }
    LoginPage.prototype.signup = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_2__register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.reset = function () {
        var _this = this;
        if (this.email) {
            __WEBPACK_IMPORTED_MODULE_5_firebase__["auth"]().sendPasswordResetEmail(this.email)
                .then(function (data) {
                return _this.toast.create({ message: 'Please check your mail', duration: 3000 }).present();
            })
                .catch(function (err) { return _this.toast.create({ message: err.message, duration: 3000 }).present(); });
        }
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        if (this.email.length == 0 || this.password.length == 0) {
            this.alertCtrl.create({ subTitle: 'Invalid Credentials', buttons: ['ok'] }).present();
        }
        else {
            var loading_1 = this.loadingCtrl.create({ content: 'Authenticating...' });
            loading_1.present();
            this.authService.login(this.email, this.password).then(function (authData) {
                loading_1.dismiss();
                _this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]);
            }, function (error) {
                // in case of login error
                loading_1.dismiss();
                var alert = _this.alertCtrl.create({
                    message: error.message,
                    buttons: ['OK']
                });
                alert.present();
            });
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Ionic\RushPack\rider\src\pages\login\login.html"*/'<ion-content>\n    <div padding text-center class="header">\n      <div class="logo secondary-bg">\n        <ion-icon name="ios-car" color="light"></ion-icon>\n      </div>\n      <h2 ion-text color="light">Login</h2>\n    </div>\n    <ion-list class="list-form" no-lines padding>\n      <ion-item>\n        <ion-input type="text" [(ngModel)]="email" placeholder="Email"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-input type="password" [(ngModel)]="password" placeholder="Password"></ion-input>\n        <button ion-button clear item-right (click)="reset()" [disabled]="email.length == 0">Forget ?</button>\n      </ion-item>\n      <ion-item>\n        <button padding ion-button block (click)="login()">LOGIN</button>\n      </ion-item>\n    </ion-list>\n</ion-content>\n<ion-footer *ngIf="isRegisterEnabled">\n  <button ion-button clear block (click)="signup()">DON\'T HAVE AN ACCOUNT?</button>\n</ion-footer>\n'/*ion-inline-end:"C:\Ionic\RushPack\rider\src\pages\login\login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[511]);
//# sourceMappingURL=main.js.map