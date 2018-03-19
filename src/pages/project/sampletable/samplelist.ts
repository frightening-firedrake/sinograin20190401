import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { HttpService } from '../../../providers/httpService'

import { detaSafePage } from '../details/detailsSafe/detailsSafe'
import { detailsWorkPage } from '../details/detailsWork/detailsWork'
import { detaildPage } from '../details/details'

declare var $;

@Component({
  selector: 'samplelist',
  templateUrl: 'samplelist.html'
})

export class  Samplelist{
  genders;
  gendersNav: any = ""
  _select_smaple = "0";
  myInput;
  Company;
  shaixuan = "筛选"
  titleName;
  listId;
  sample
  public Companyarr;
  public gendersarr: any = [
    // "本库", "沁县库区", "山西屯留国家粮食储备库", "山西晋城国家粮食储备库", "长子分库", "山西长治国家粮食储备", "黎城分库"
  ]
  gendrslist = [];
  constructor(public navCtrl: NavController, public parpam: NavParams, public Http: HttpService, public BLE: BLE, public cd: ChangeDetectorRef) {

    this.gendersNav = this.parpam.get("num")
    this.sample = this.parpam.get("newpage")
    this.getlist(this.sample.libraryId)
    console.log(this.gendersNav)
    if(this.gendersNav == "4"){
      this.titleName = "扦样列表"
      console.log(this.titleName)
    }else if(this.gendersNav == "3"){
      this.titleName = "监督检查列表"
    }else if(this.gendersNav == "2"){
      this.titleName = "工作底稿列表"
    }
    // // 所有库点
    // this.Http.get("grain/library/getAll").subscribe(res => {
    //   // console.log(res.json())
    //   this.gendersarr = res.json()

    // })
  }
  // 每次进页面下拉刷新
  ionViewDidEnter() {


    // this.doRefresh()
  }
  getlist(listId) {
    this.listId = listId
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
    // $(".search_state").off().on("click", function () {

    //   $(".zhezhao").toggle()
    //   $(".screen").toggle()
    //   $(".thead").toggle()
    // })
    $(".buttons").off().on("click", "button", function (e) {
      $(".buttons button").removeClass("active")
      $(this).addClass("active")
    })
    // $(".zhezhao").off().on("click", function () {
    //   $(this).hide()
    //   $(".screen").hide()
    //   $(".thead").toggle()
    // })
    // $(".submit").off().on("click", function () {
    //   $(".zhezhao").toggle()
    //   $(".screen").toggle()
    //   $(".thead").toggle()
    // })
  }

  //筛选框的三种分类
  select_smaple(event = '0') {
    if(event == "-1"){
      this.shaixuan = "未扦样"
    }else if(event == "1"){
      this.shaixuan = "已扦样"
    }else{
      this.shaixuan = "筛选"
    }
    this._select_smaple = event
    this.getlist(this.listId)
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
        this.navCtrl.push(detaSafePage, {
          "params": key,
          "newpage": this.gendersNav
        })
        break;
      case 2:
        this.navCtrl.push(detailsWorkPage, {
          "params": key,
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
  // doInfinite(infiniteScroll) {
  //   {
  //     setTimeout(() => {
  //       infiniteScroll.complete();
  //     }, 5000);
  //   }
  // }
}
