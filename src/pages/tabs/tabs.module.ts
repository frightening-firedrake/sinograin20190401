import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { TabsPage } from "./tabs";

@NgModule({

    declarations: [
        TabsPage
    ],
    imports: [
        IonicPageModule.forChild(TabsPage)
    ],
    entryComponents: [
        TabsPage
    ],
    providers: [],
})
export class TabModule {
}
