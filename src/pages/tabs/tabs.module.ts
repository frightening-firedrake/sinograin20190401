import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { TabsPage } from "./tabs";
import { ProjectPage } from '../project/project';

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
  providers: [],
})
export class TabModule {
}
