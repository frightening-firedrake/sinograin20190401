import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomeService } from './home.serve';

import { SearchPage } from './search/search';
import { IntroducePage } from './introduce/introduce';
import { DepartmentPage } from './department/department';
import { NewListPage } from './newlist/newlist';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public login:string = "在线"
  constructor(public navCtrl: NavController,public Home:HomeService ) {
  }
  new(parpam){
    this.Home.setgender(parpam)
    this.navCtrl.parent.select(1);
  }
}
