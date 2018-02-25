import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomeService } from '../home/home.serve';
import { HttpService } from '../../providers/httpService'

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
    "本库", "沁县库区", "山西屯留国家粮食储备库", "山西晋城国家粮食储备库", "长子分库", "山西长治国家粮食储备", "黎城分库"
  ]
  gendrslist = [
    // {
    //   id:1,
    //   sampleNo:"襄阳-漫水-1",
    //   position:"7",
    //   sort:"玉米",
    //   state:1
    // },
    // {
    //   id:1,
    //   sampleNo:"襄阳-漫水-1",
    //   position:"7",
    //   sort:"玉米",
    //   state:1
    // },
    // {
    //   id:1,
    //   sampleNo:"襄阳-漫水-1",
    //   position:"7",
    //   sort:"玉米",
    //   state:1
    // },
    // {
    //   id:1,
    //   sampleNo:"襄阳-漫水-1",
    //   position:"7",
    //   sort:"玉米",
    //   state:1
    // },
    // {
    //   id:1,
    //   sampleNo:"襄阳-漫水-1",
    //   position:"7",
    //   sort:"玉米",
    //   state:1
    // },
    // {
    //   id:1,
    //   sampleNo:"襄阳-漫水-1",
    //   position:"7",
    //   sort:"玉米",
    //   state:1
    // },
    // {
    //   id:1,
    //   sampleNo:"襄阳-漫水-1",
    //   position:"7",
    //   sort:"玉米",
    //   state:1
    // },
    // {
    //   id:1,
    //   sampleNo:"襄阳-漫水-1",
    //   position:"7",
    //   sort:"玉米",
    //   state:0
    // }
  ];

  constructor(public navCtrl: NavController, public parpam: NavParams, public Http: HttpService) {
    this.gendersNav = this.parpam.get("num")
    this.Http.get("grain/sample/data").subscribe(res => {
      console.log(res.json())
      this.gendrslist = res.json()['rows']
    })
  }
  ionViewWillEnter() {
    $(".search_state").off().on("click", function () {

      $(".zhezhao").toggle()
      $(".screen").toggle()
      // $(".tabbar").toggle()
      $(".thead").toggle()
    })
    $(".buttons").off().on("click", "button", function (e) {
      $(".buttons button").removeClass("active")
      $(this).addClass("active")
      // $(".tabbar").toggle()
    })
    $(".zhezhao").off().on("click", function () {
      $(this).hide()
      $(".screen").hide()
      // $(".tabbar").toggle()
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
