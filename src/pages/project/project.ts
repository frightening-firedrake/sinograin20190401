import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { projectViewPage } from './view/project_view';

@Component({
  selector: 'page-about',
  templateUrl: 'project.html'
})
export class ProjectPage {
  genders:string;
  public optionarr:any = [
    "本库","XX分库","XX分库","XX分库","XX分库","XX分库","XX分库","XX分库","XX分库"
  ]
  constructor(public navCtrl: NavController) {
  }
  // 下拉刷新
  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  // 上啦加载
  doInfinite(infiniteScroll) {
    {
 

      setTimeout(() => {
        infiniteScroll.complete();
      }, 500);
    }
  }
}
