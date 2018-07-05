import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';

import { loginModule } from "../login/login.module"
import { TabsPage } from "./tabs";

@NgModule({

    declarations: [
        TabsPage
    ],
    imports: [
        loginModule,
        IonicPageModule.forChild(TabsPage)
    ],
    entryComponents: [
        TabsPage
    ],
    providers: [],
})
export class TabModule {
}
