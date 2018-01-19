import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';
import { _alertBomb } from '../common/_alert'

import { AboutPage } from './about'
import { CommonsModule } from '../common/common.module';
import { setpassPage } from './setpass/setpass'

@NgModule({
    declarations: [
        AboutPage,
        setpassPage
    ],
    imports: [
        CommonModule,
        IonicPageModule.forChild(AboutPage), 
        CommonsModule
    ],
    entryComponents: [
       AboutPage ,
       setpassPage
    ],
    providers: [
        _alertBomb
    ]
})

export class AboutModule {

}