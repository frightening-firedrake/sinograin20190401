import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { QRCodeModule } from 'angularx-qrcode';
import { Geolocation } from '@ionic-native/geolocation';

import { Mypage } from './my.component';
import { LoginModule } from './login/login.module';
import { MyHeardePage } from './my_hearde.component';
import { ScanPage } from './scan/scan.component';
import { CameraPage } from './camera/camera.component'
import { QrcodePage } from './qrcode/qrcode.component'
import { geolocationPage } from './geolocation/geolocation.component';
import { DataPage } from "./data/data.component";
import { UserPhotoPage } from './data/photo/photo.component';
import { sexPage } from './data/sex/sex.component';
import { namePage } from './data/name/name.component';
import { nicknamePage } from './data/nickname/nickname.component'

@NgModule({
    declarations: [
        Mypage,
        MyHeardePage,
        ScanPage,
        CameraPage,
        geolocationPage,
        DataPage,
        UserPhotoPage,
        sexPage,
        namePage,
        nicknamePage,
        QrcodePage
    ],
    imports: [
        CommonModule,
        IonicPageModule.forChild(Mypage),
        LoginModule,
        QRCodeModule
    ],
    entryComponents: [
        Mypage,
        MyHeardePage,
        ScanPage,
        CameraPage,
        geolocationPage,
        DataPage,
        UserPhotoPage,
        sexPage,
        namePage,
        nicknamePage,
        QrcodePage
    ],
    providers: [
        Camera,
        Geolocation,
       
    ],
})
export class MyAboutModule {

}