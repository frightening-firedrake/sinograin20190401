import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
import { _alertBomb } from '../common/_alert'
import { StorageService } from '../../providers/locationstorageService'
import { HttpService } from '../../providers/httpService'
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { AboutPage } from './about'
import { CommonsModule } from '../common/common.module';
import { setpassPage } from './setpass/setpass'
import { loginModule } from "../login/login.module"

@NgModule({
    declarations: [
        AboutPage,
        setpassPage,
    ],
    imports: [
        CommonModule,
        IonicPageModule.forChild(AboutPage), 
        CommonsModule,
        loginModule
    ],
    entryComponents: [
       AboutPage ,
       setpassPage,
    ],
    providers: [
        _alertBomb,
        StorageService,
        AppVersion,
        HttpService,
        InAppBrowser
    ]
})

export class AboutModule {

}