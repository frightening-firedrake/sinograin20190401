import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';

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
  genders;
  gendersNav: any = ""
  _select_smaple = "-1";
  myInput;
  Company;
  public Companyarr;
  public gendersarr: any = [
    // "本库", "沁县库区", "山西屯留国家粮食储备库", "山西晋城国家粮食储备库", "长子分库", "山西长治国家粮食储备", "黎城分库"
  ]
  gendrslist = [];
  constructor(public navCtrl: NavController, public parpam: NavParams, public Http: HttpService, public BLE: BLE, public cd: ChangeDetectorRef) {

    this.gendersNav = this.parpam.get("num")
    // // 所有库点
    // this.Http.get("grain/library/getAll").subscribe(res => {
    //   // console.log(res.json())
    //   this.gendersarr = res.json()

    // })
    // 被查单位
    let Company = {
      "pLibraryId": "-1"
    }
    this.Http.post("grain/library/data", Company).subscribe(res => {
      console.log(res.json())
      this.Companyarr = res.json()["rows"]
      // this.Company = this.Companyarr[0].id
    })
  }
  // 每次进页面下拉刷新
  ionViewDidEnter() {


    // this.doRefresh()
  }
  // 选择被查库点
  changeVersion(list) {
    let data = {
      params: '{"pLibraryId":' + list + '}'
    }
    this.Http.post("grain/sample/data", data).subscribe(res => {
      this.gendersarr = res.json()["rows"]
      console.log(this.gendersarr)
      // this.genders = this.gendersarr[0].id
    })
  }
  getlist(listId) {
    let data = {
      params: `{"libraryId":${listId},"sampleState":${this._select_smaple},"regState":2}`
    }
    this.genders = listId
    this.Http.post("grain/sample/dataMobile", data).subscribe(res => {
      console.log(res)
      // console.log(res.json(),"color:blue")
      this.gendrslist = res.json()["rows"]
    })
  }
  ionViewWillEnter() {
    $(".search_state").off().on("click", function () {

      $(".zhezhao").toggle()
      $(".screen").toggle()
      $(".thead").toggle()
    })
    $(".buttons").off().on("click", "button", function (e) {
      $(".buttons button").removeClass("active")
      $(this).addClass("active")
    })
    $(".zhezhao").off().on("click", function () {
      $(this).hide()
      $(".screen").hide()
      $(".thead").toggle()
    })
    $(".submit").off().on("click", function () {
      $(".zhezhao").toggle()
      $(".screen").toggle()
      $(".thead").toggle()
    })
  }

  //筛选框的三种分类
  select_smaple(event = "-1") {
    this._select_smaple = event
    // let data = {
    //   params: '{"libraryId":1,"sampleState":' + event + '}'
    // }
    // this.Http.post("grain/sample/data", data).subscribe(res => {
    //   // console.log(res.json(),"color:blue")
    //   this.gendrslist = res.json()["rows"]
    // })
  }
  // 点击完成时连接后台
  secondary() {
    let data;
    if (!this.myInput) {
      data = {
        params: `{"libraryId":${this.genders},"sampleState":${this._select_smaple},"regState":2}`
      }
    } else {
      data = {
        params: `{"libraryId":${this.genders},"sampleState":${this._select_smaple},"sort":"${this.myInput}"}`
        // params: '{"libId":'+this.genders+',"sampleState":' + this._select_smaple+',"sort":'+this./+'}'
      }
    }
    this.Http.post("grain/sample/dataMobile", data).subscribe(res => {
      console.log(res)
      // console.log(res.json(),"color:blue")
      this.gendrslist = res.json()["rows"]
    })
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
    this.secondary()
    console.log(refresher)
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
