import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

import { CommonsModule } from '../common/common.module';
import { HomePage } from './home';
import { noticePage } from './notice/notice'
import { noticeViewPage } from './notice/notice_view/notice_view'
import { NoCode } from './nocode/nocode';
import { libraryPage } from './nocode/library/library'
import { codePage } from "./code/code"
import { roomPage } from './room/room'
import { SamplePage } from "./room/sample/sample"
import { transferPage } from "./room/sample/transfer/transfer"
import { sampleDetailsPage } from "./notice/sampledetails/sampledetails"
import { SamllSamplePage } from './revert/samllsample/samllsample'
import { Revertlist } from './revert/revertlist/revertlist'
import { SampleDetailsPage } from './room/sample/details/details'

// import { detaildPage } from '../project/details/details'

import { _alertBomb } from '../common/_alert'
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { StorageService } from '../../providers/locationstorageService'


@NgModule({
    declarations: [
        HomePage,
        noticePage,
        noticeViewPage,
        NoCode,
        libraryPage,
        codePage,
        roomPage,
        SamplePage,
        transferPage,
        sampleDetailsPage,
        Revertlist,
        SamllSamplePage,
        SampleDetailsPage
    ],
    imports: [
        CommonModule,
        IonicPageModule.forChild(HomePage),
        CommonsModule
    ],
    entryComponents: [
        HomePage,
        noticePage,
        noticeViewPage,
        NoCode,
        libraryPage,
        codePage,
        roomPage,
        SamplePage,
        transferPage,
        sampleDetailsPage,
        Revertlist,
        SamllSamplePage,
        SampleDetailsPage
    ],
    providers: [
        _alertBomb,
        StorageService,
        BarcodeScanner,
        BLE
    ],
})
export class HomeModule {

}