import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { HomeService } from '../home/home.serve';
import { Camera } from '@ionic-native/camera';

import { CommonsModule } from '../common/common.module';
import { ProjectPage } from './project';
import { safePage } from './safe/safe'
import { safeViewPage } from './safe/safe_view/safe_view'

@NgModule({
    declarations: [
        ProjectPage,
        safePage,
        safeViewPage
    ],
    imports: [
        CommonModule,
        IonicPageModule.forChild(ProjectPage), 
        CommonsModule
    ],
    entryComponents: [
        ProjectPage,
        safePage,
        safeViewPage
    ],
     providers:[
        HomeService,
        Camera
    ]
})
export class ProjectModule {

}