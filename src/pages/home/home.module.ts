import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { CommonsModule } from '../common/common.module';
import { HomePage } from './home';
import { noticePage } from './notice/notice'
import { noticeViewPage } from './notice/notice_view/notice_view'

import { HomeService } from './home.serve';

@NgModule({
    declarations: [
        HomePage,
        noticePage,
        noticeViewPage
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
        noticeViewPage
    ],
    providers:[
        HomeService
    ]
})
export class HomeModule {

}