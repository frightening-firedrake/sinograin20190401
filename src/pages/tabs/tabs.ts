import { Component, ViewChild } from '@angular/core';
import { NavParams, ModalController } from 'ionic-angular';
import { Tabs } from "ionic-angular";
import { StorageService } from '../../providers/locationstorageService'

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about'


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') tabs: Tabs;
  homeRoot = HomePage;
  aboutRoot = AboutPage;
  // public id: number;
  // public selectTabIndex: number;

  constructor(public params: NavParams, public Storage: StorageService) {
    // console.log(this.Storage.GetStorage("userLogin"))


    // console.info(params.get('id'));
    //  this.id = params.get('id');
    //   if(this.id != undefined || this.id != null) {
    //      this.selectTabIndex = this.id;
    //   }
  }


}
