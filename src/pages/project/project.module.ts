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

@NgModule({
    declarations: [
        ProjectPage,
        safePage,
        safeViewPage,
        workPage,
        workViewPage,
        detaildPage
    ],
    imports: [
        CommonModule,
        IonicPageModule.forChild(ProjectPage), 
        CommonsModule
    ],
    entryComponents: [
        ProjectPage,
        safePage,
        safeViewPage,
        workPage,
        workViewPage,
        detaildPage
    ],
     providers:[
        HomeService,
        Camera,
        _alertBomb,
        BLE,
    ]
})
export class ProjectModule {

}