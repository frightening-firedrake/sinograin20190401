import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { CommonsModule } from '../common/common.module';
import { ProjectPage } from './project';
import { projectViewPage } from './view/project_view';

@NgModule({
    declarations: [
        ProjectPage,
        projectViewPage
    ],
    imports: [
        CommonModule,
        IonicPageModule.forChild(ProjectPage), 
        CommonsModule
    ],
    entryComponents: [
        ProjectPage,
        projectViewPage
    ]
})
export class ProjectModule {

}