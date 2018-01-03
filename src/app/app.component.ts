import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform,geolocation: Geolocation, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {

      // get current position
      // geolocation.getCurrentPosition().then(pos => {
      //   console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      // });

      // const watch = geolocation.watchPosition().subscribe(pos => {
      //   console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      // });

      // to stop watching
      // watch.unsubscribe();
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
}

