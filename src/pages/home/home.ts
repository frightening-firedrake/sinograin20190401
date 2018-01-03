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
  constructor(public navCtrl: NavController) {

  }
  gotosearch() {
    this.navCtrl.push(SearchPage);
  }
  introduce() {
    this.navCtrl.push(IntroducePage)
  }
  support() {
    window.localStorage.setItem('tech', 'support');
    this.navCtrl.parent.select(2);
  }
  features() {
    window.localStorage.setItem('tech', 'features');
    this.navCtrl.parent.select(2);
  }
  framework() {
    window.localStorage.setItem('teams', 'framework');
    this.navCtrl.parent.select(3);
  }
  culture() {
    window.localStorage.setItem('teams', 'culture');
    this.navCtrl.parent.select(3);
  }
  move() {
    window.localStorage.setItem('project', 'phone');
    this.navCtrl.parent.select(1);
  }
  PC() {
    window.localStorage.setItem('project', 'pc');
    this.navCtrl.parent.select(1);
  }
  department() {
    this.navCtrl.push(DepartmentPage)
  }
  advantage() {
    window.localStorage.setItem('tech', 'advantage');
    this.navCtrl.parent.select(2);
  }
  gotonewlist(param) {
    this.navCtrl.push(NewListPage, {
      params: {
        title: param.title,
        id: param.id
      }
    })
  }
}
