import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule,IonicPageModule } from 'ionic-angular';

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
import { ReverNocodePage } from './revert/nocode/nocode'
import { RevercodePage } from './revert/code/code'

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
        ReverNocodePage,
        RevercodePage
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
        ReverNocodePage,
        RevercodePage
    ],
    providers: [
        _alertBomb,
        StorageService,
        BarcodeScanner,
    ],
})
export class HomeModule {

}