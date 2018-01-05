import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomeService } from '../home/home.serve';

import { safePage } from './safe/safe'
import { newSamp } from './new/new'
import { workPage } from './work/work'

@Component({
  selector: 'page-about',
  templateUrl: 'project.html'
})
export class ProjectPage {
  genders: string;
  gendersNav: any = ""
  public optionarr: any = [
    "本库", "XX分库", "XX分库", "XX分库", "XX分库", "XX分库", "XX分库", "XX分库", "XX分库"
  ]
  gendrslist = [
    {
      id: 1,
      name: "咸阳-玉米-510",
      safe:"被查库点",
      position:5,
      breen: "玉米",
      stat: 2
    },
      {
      id: 1,
      name: "咸阳-玉米-510",
      safe:"被查库点",
      position:5,
      breen: "玉米",
      stat: 1
    },
      {
      id: 1,
      name: "咸阳-玉米-510",
      safe:"被查库点",
      position:5,
      breen: "玉米",
      stat: 2
    },
    

  ]
  constructor(public navCtrl: NavController, public Home: HomeService) {

  }
  ionViewWillEnter() {
    this.Home.getgenders().subscribe((res) => {
      this.gendersNav = res
    })
  }
  // 不同点击，改变页面
  setNavPush(key: any) {
    switch (this.gendersNav) {
      case 3:
        this.navCtrl.push(safePage, {
          "json": key
        })
        break;
      case 1:
        this.navCtrl.push(newSamp, {
          "json": key
        })
        break;
        case 2:
          this.navCtrl.push(workPage,{
            "json":key
          })
    }
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
