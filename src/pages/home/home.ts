import { Component, ViewChild } from '@angular/core';
import { NavController, App, ViewController, NavParams } from 'ionic-angular';
import { _alertBomb } from '../common/_alert'
import { BLE } from '@ionic-native/ble';
import { StorageService } from '../../providers/locationstorageService'

import { HomeService } from './home.serve';
import { ProjectPage } from '../project/project'
import { loginPage } from '../login/login'
import { noticePage } from './notice/notice'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public login: string = "在线"
  public userName: string;
  devices: any;
  device: any;
  characteristics: any;
  serviceUUID: any;
  characteristicUUID: any;
  deviceId: any;
  buffered;
  constructor(
    public _alert: _alertBomb,
    public navCtrl: NavController,
    public Home: HomeService,
    public viewCtrl: ViewController,
    public appCtrl: App,
    public Storage: StorageService,
    public params: NavParams,
    public BLE: BLE
  ) {
    this.devices = [];
  }
  ionViewDidEnter() {
    this.Storage.GetStorage("userLogin").subscribe(res => {
      res.then(suc => {
        if (suc) {
          this.userName = suc.userName
        }
      })
    })
  }
  




  newpage(parpam, event) {
    // console.log(event)
    this.navCtrl.push(ProjectPage, { "num": parpam })
    // this.Home.setgender(parpam)

  }
  newyang() {
    this.navCtrl.push(noticePage)
  }
  // loading() {
  //   var parpam = {
  //     title: '暂未开放',
  //     subTitle: "敬请期待",
  //     buttons: [
  //       {
  //         text: "确认",
  //         handler: () => {

  //         }
  //       }
  //     ],
  //     cssClass: "outsuccse only"
  //   }
  //   var addbuton = {
  //     text: null
  //   }
  //   var addInput = []
  //   this._alert._alertSmlpe(parpam, addbuton, addInput, function (data) { })
  // }
}
