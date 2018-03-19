import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { HomeService } from '../home/home.serve';
import { Camera } from '@ionic-native/camera';
import { BLE } from '@ionic-native/ble';
import { _alertBomb } from '../common/_alert'

import { CommonsModule } from '../common/common.module';
import { ProjectPage } from './project';
import { safePage } from './safe/safe'
import { safeViewPage } from './safe/safe_view/safe_view'
import { workPage } from './work/work'
import { workViewPage } from './work/work_view/work_view'
import { detaildPage } from './details/details'
import { detailsWorkPage } from './details/detailsWork/detailsWork'
import { detaSafePage } from './details/detailsSafe/detailsSafe'
import { detasafeViewPage } from './details/detailsSafe/detasafe_view/detasafe_view'
import { dateSafeServe } from './details/detailsSafe/detasafeSever';
import { Samplelist } from './sampletable/samplelist';
import { PhotoViewer } from '@ionic-native/photo-viewer';

@NgModule({
    declarations: [
        ProjectPage,
        safePage,
        safeViewPage,
        workPage,
        workViewPage,
        detaildPage,
        detailsWorkPage,
        detaSafePage,
        detasafeViewPage,
        Samplelist
    ],
    imports: [
        CommonModule,
        IonicPageModule.forChild(ProjectPage), 
        CommonsModule,
    ],
    entryComponents: [
        ProjectPage,
        safePage,
        safeViewPage,
        workPage,
        workViewPage,
        detaildPage,
        detailsWorkPage,
        detaSafePage,
        detasafeViewPage,
        Samplelist
    ],
     providers:[
        HomeService,
        Camera,
        _alertBomb,
        BLE,
        dateSafeServe,
        PhotoViewer
    ]
})
export class ProjectModule {

}