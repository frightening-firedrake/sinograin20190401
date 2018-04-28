import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { CommonsModule } from '../common/common.module';
import { HomePage } from './home';
import { noticePage } from './notice/notice'
import { noticeViewPage } from './notice/notice_view/notice_view'
// import { detaildPage } from '../project/details/details'

import { HomeService } from './home.serve';
import { _alertBomb } from '../common/_alert'
import { BLE } from '@ionic-native/ble';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { StorageService } from '../../providers/locationstorageService'


@NgModule({
    declarations: [
        HomePage,
        noticePage,
        noticeViewPage,
    ],
    imports: [
        CommonModule,
        IonicModule.forRoot(HomePage,{}
        ), 
        CommonsModule
    ],
    entryComponents: [
        HomePage,
        noticePage,
        noticeViewPage,
    ],
    providers:[
        HomeService,
        _alertBomb,
        StorageService,
        BLE,
        BarcodeScanner
    ]
})
export class HomeModule {

}