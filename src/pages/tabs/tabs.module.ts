import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HomeService } from '../home/home.serve';

import { loginModule } from "../login/login.module"
import { TabsPage } from "./tabs";

@NgModule({

  declarations: [
      TabsPage
      ],
  imports: [
      loginModule,
      IonicModule.forRoot(TabsPage)
    ],
  entryComponents: [
      TabsPage
      ],
  providers: [HomeService],
})
export class TabModule {
}
