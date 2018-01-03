import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicPageModule } from 'ionic-angular';

import { StorageService } from '../../../providers/locationstorageService';

import { LoginPage } from './login/login';
import { LoginHearderPage } from "./login_header";
import { RegisterPage } from "./register/register";
import { ForgetPage } from "./forget/forget";



@NgModule({
    declarations: [
        LoginHearderPage,
        LoginPage,
        RegisterPage,
        ForgetPage
    ],
    imports: [
        CommonModule,
        IonicPageModule.forChild(LoginPage),
    ],
    entryComponents: [
        LoginHearderPage,
        LoginPage,
        RegisterPage,
        ForgetPage
    ],
    providers: [StorageService]
})

export class LoginModule {

}