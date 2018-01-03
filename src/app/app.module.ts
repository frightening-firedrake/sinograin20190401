import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Platform  } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { Toast } from '@ionic-native/toast';
import { Geolocation } from '@ionic-native/geolocation';
import { BarcodeScanner } from '@ionic-native/barcode-scanner'; 

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { ProjectModule } from '../pages/project/project.module';
import { HomeModule } from '../pages/home/home.module';
import { TabModule } from '../pages/tabs/tabs.module';
import { linkConfig } from './routerConfig';

import { GlobalData } from '../providers/globalData';
import { HttpService } from '../providers/httpService';
import { NativeService } from '../providers/nativeService';
import { StorageService } from '../providers/locationstorageService';
import { Utils } from '../providers/Utils';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: " ",
      backButtonIcon: "arrow-back",
      tabsHideOnSubPages: 'true'
    }, linkConfig),
    IonicStorageModule.forRoot({
      name: 'webapp',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    TabModule,
    HomeModule,
    ProjectModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StorageService,
    GlobalData,
    HttpService, 
    NativeService,
    Utils,
    Toast,
    Geolocation,
    BarcodeScanner,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
