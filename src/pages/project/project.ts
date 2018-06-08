import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { HttpService } from '../../providers/httpService'

import { detaSafePage } from './details/detailsSafe/detailsSafe'
import { detailsWorkPage } from './details/detailsWork/detailsWork'
import { detaildPage } from './details/details'
import { Samplelist } from './sampletable/samplelist'

declare var $;

@Component({
  selector: 'page-about',
  templateUrl: 'project.html'
})

export class ProjectPage {
  genders;
  gendersNav: any = ""
  _select_smaple = "0";
  myInput;
  Company;
  shaixuan = "筛选"
  titleName;
  listId;
  samplylist: any;
  prompt: boolean = false;
  promptobj = {
    content: "请选择被查直属库、被查库点进行筛选哦!"
  }
  public Companyarr: any;

  public gendersarr: any = [
    // "本库", "沁县库区", "山西屯留国家粮食储备库", "山西晋城国家粮食储备库", "长子分库", "山西长治国家粮食储备", "黎城分库"
  ]
  gendrslist = [];
  constructor(public navCtrl: NavController, public parpam: NavParams, public Http: HttpService) {

    this.gendersNav = this.parpam.get("num")
    console.log(this.gendersNav)
    if (this.gendersNav == "4") {
      this.titleName = "扦样登记列表"
      console.log(this.titleName)
    } else if (this.gendersNav == "3") {
      this.titleName = "监督检查"
    } else if (this.gendersNav == "2") {
      this.titleName = "工作底稿"
    }
    // // 所有库点
    // this.Http.get("grain/library/getAll").subscribe(res => {
    //   // console.log(res.json())
    //   this.gendersarr = res.json()

    // })
    // 被查单位
    let Company = {
      params: `{"pLibraryId": "-1","page":"1","rows":"100"}`
    }
    this.Http.post("grain/library/getAll", Company).subscribe(res => {
      this.samplylist = res.json()
      this.Companyarr = this.samplylist.filter((i, v) => {
        return i.pLibraryId == -1
      })
      // this.Company = this.Companyarr[0].id
    })
  }
  // 每次进页面下拉刷新
  ionViewDidEnter() {


    // this.doRefresh()
  }
  // 选择被查库点
  changeVersion(list) {
    this.gendersarr = this.samplylist.filter((i, v) => {
      return i.pLibraryId == list
    })
    // let data = {
    //   params: '{"pLibraryId":' + list + '}'
    // }
    // this.Http.post("grain/library/getAll", data).subscribe(res => {
    //    console.log(res.json())
    //   this.gendersarr = res.json()["rows"]

    //this.genders = this.gendersarr[0].id
    // })
  }
  getlist(listId) {
    this.listId = listId
    let data = {
      params: `{"libraryId":${listId},"regState":2}`
    }
    this.genders = listId
    this.Http.post("grain/register/data", data).subscribe(res => {
      console.log(res.json())
      this.prompt = true
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
    // $(".buttons").off().on("click", "button", function (e) {
    //   $(".buttons button").removeClass("active")
    //   $(this).addClass("active")
    // })
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
    if (event == "-1") {
      this.shaixuan = "未扦样"
    } else if (event == "1") {
      this.shaixuan = "已扦样"
    } else {
      this.shaixuan = "筛选"
    }
    this._select_smaple = event
    this.getlist(this.listId)
    $(".zhezhao").toggle()
    $(".screen").hide()
    $(".thead").toggle()
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
        params: `{"libraryId":${this.genders},"regState":2}`
      }
    } else {
      data = {
        params: `{"libraryId":${this.genders},"sampleState":${this._select_smaple},"sort":"${this.myInput}"}`
        // params: '{"libId":'+this.genders+',"sampleState":' + this._select_smaple+',"sort":'+this./+'}'
      }
    }
    this.Http.post("grain/register/data", data).subscribe(res => {
      console.log(res)
      // console.log(res.json(),"color:blue")
      this.gendrslist = res.json()["rows"]
    })
  }
  // 进入列表页
  setNavPush(key: any) {
    this.navCtrl.push(Samplelist, { "num": this.gendersNav, "newpage": key })
  }
  // 下拉刷新
  doRefresh(refresher) {
    this.secondary()
    console.log(refresher)
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
  // // 上啦加载
  // doInfinite(infiniteScroll) {
  //   {
  //     setTimeout(() => {
  //       infiniteScroll.complete();
  //     }, 5000);
  //   }
  // }
}
