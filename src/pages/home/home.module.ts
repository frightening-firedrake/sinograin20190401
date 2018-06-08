import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { CommonsModule } from '../common/common.module';
import { HomePage } from './home';
import { noticePage } from './notice/notice'
import { noticeViewPage } from './notice/notice_view/notice_view'
import { NoCode } from './nocode/nocode';
import { libraryPage } from './nocode/library/library'
import { codePage } from "./code/code"
import { roomPage } from './room/room'
// import { detaildPage } from '../project/details/details'

import { HomeService } from './home.serve';
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
        roomPage
    ],
    imports: [
        CommonModule,
        IonicModule.forRoot(HomePage, {}
        ),
        CommonsModule
    ],
    entryComponents: [
        HomePage,
        noticePage,
        noticeViewPage,
        NoCode,
        libraryPage,
        codePage,
        roomPage
    ],
    providers: [
        HomeService,
        _alertBomb,
        StorageService,
        BarcodeScanner
    ],
})
export class HomeModule {

}