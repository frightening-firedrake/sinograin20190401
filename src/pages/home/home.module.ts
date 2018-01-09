import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { CommonsModule } from '../common/common.module';
import { HomePage } from './home';
import { newSamp } from './new/new'
import { basePage } from './base/base'


import { HomeService } from './home.serve';

@NgModule({
    declarations: [
        HomePage,
        newSamp,
        basePage
    ],
    imports: [
        CommonModule,
        IonicModule.forRoot(HomePage,{}
        ), 
        CommonsModule
    ],
    entryComponents: [
        HomePage,
        newSamp,
        basePage
    ],
    providers:[
        HomeService
    ]
})
export class HomeModule {

}