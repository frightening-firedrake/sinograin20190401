import { Component, ViewChild } from '@angular/core';
import { NavController,App, ViewController } from 'ionic-angular';

import { HomeService } from './home.serve';
import { loginPage } from '../login/login'
import { basePage } from './base/base'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public login:string = "在线"
  constructor(public navCtrl: NavController,public Home:HomeService, public viewCtrl: ViewController
      ,public appCtrl: App) {
  }
  newpage(parpam){
    this.Home.setgender(parpam)
    this.navCtrl.parent.select(1);
  }
  newyang(){
    this.navCtrl.push(basePage)
  }

}
