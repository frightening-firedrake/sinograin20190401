import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';

import { CommonsModule } from '../common/common.module';
import { HomePage } from './home';


import { HomeService } from './home.serve';

@NgModule({
    declarations: [
        HomePage,

    ],
    imports: [
        CommonModule,
        IonicModule.forRoot(HomePage,{}
        ), 
        CommonsModule
    ],
    entryComponents: [
        HomePage,

    ],
    providers:[
        HomeService
    ]
})
export class HomeModule {

}