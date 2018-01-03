import { NgModule} from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

import { HeaderPage } from './header/headerPage';


@NgModule({

  declarations: [
      HeaderPage
      ],
  imports: [
      IonicModule,
      CommonModule,
      FormsModule,
    ],
  providers: [],
  exports: [ HeaderPage ]
})
export class CommonsModule {
}
