import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CommonsModule } from '../common/common.module'
import { loginPage } from './login'

import { _alertBomb } from '../common/_alert'

@NgModule({
    declarations: [
        loginPage
    ],
    imports: [
        IonicModule.forRoot(loginPage),
        CommonsModule
    ],
    entryComponents: [
        loginPage
    ],
    providers: [_alertBomb],
})

export class loginModule {

}