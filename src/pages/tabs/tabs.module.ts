import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HomeService } from '../home/home.serve';


import { TabsPage } from "./tabs";

@NgModule({

  declarations: [
      TabsPage
      ],
  imports: [
      IonicModule.forRoot(TabsPage)
    ],
  entryComponents: [
      TabsPage
      ],
  providers: [HomeService],
})
export class TabModule {
}
