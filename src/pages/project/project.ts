import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import { HomeService } from '../home/home.serve';

import { safePage } from './safe/safe'
import { workPage } from './work/work'
import { detaildPage } from './details/details'

declare var $;

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
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    },
    {
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 1
    },
    {
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    }, {
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    }, {
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    }, {
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    }, {
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    }, {
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    },
{
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    },{
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    },{
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    },{
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    },{
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    },{
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    },{
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    },{
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    },{
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    },{
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    },{
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    },{
      id: 1,
      name: "咸阳-玉米-510",
      safe: "被查库点",
      position: 5,
      breen: "玉米",
      stat: 2
    },

  ]
  constructor(public navCtrl: NavController, public parpam: NavParams) {
    this.gendersNav = this.parpam.get("num")

  }
  ionViewWillEnter() {
    $(".search_state").off().on("click", function () {

      $(".zhezhao").toggle()
      $(".screen").toggle()
      $(".tabbar").toggle()
      $(".thead").toggle()
    })
    $(".buttons").off().on("click", "button", function (e) {
      $(".buttons button").removeClass("active")
      $(this).addClass("active")
    })
    $(".zhezhao").off().on("click", function () {
      $(this).hide()
      $(".screen").hide()
      $(".tabbar").toggle()
      $(".thead").toggle()
    })
    // this.Home.getgenders().subscribe((res) => {
    //   this.gendersNav = res
    // })
  }
  // 不同点击，改变页面
  setNavPush(key: any) {

    switch (this.gendersNav) {
      case 3:
        this.navCtrl.push(safePage, {
          "json": key,
          "newpage": this.gendersNav
        })
        break;
      case 2:
        this.navCtrl.push(workPage, {
          "json": key,
          "newpage": this.gendersNav
        })
        break;
      default:
        this.navCtrl.push(detaildPage, {
          "json": key
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
      }, 5000);
    }
  }
}
