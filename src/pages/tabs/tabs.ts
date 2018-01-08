import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HomeService } from '../home/home.serve';

import { ProjectPage } from '../project/project';
import { HomePage } from '../home/home';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  homeRoot = HomePage;
  projectRoot = ProjectPage;
  // public id: number;
  // public selectTabIndex: number;

  constructor(public params: NavParams,public Home: HomeService) {
    // console.info(params.get('id'));
    //  this.id = params.get('id');
    //   if(this.id != undefined || this.id != null) {
    //      this.selectTabIndex = this.id;
    //   }
  }
  newpage(par){
    this.Home.setgender(par)
  }

}
