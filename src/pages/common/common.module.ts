import { NgModule} from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { HeaderPage } from './header/headerPage';
import { promptPage } from './Prompt/Prompt';


@NgModule({

  declarations: [
      HeaderPage,
      promptPage
      ],
  imports: [
      IonicModule,
      CommonModule,
      FormsModule,
    ],
  providers: [],
  exports: [ HeaderPage,promptPage ]
})
export class CommonsModule {
}
