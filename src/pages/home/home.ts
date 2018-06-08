import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { _alertBomb } from '../common/_alert'
import { StorageService } from '../../providers/locationstorageService'

import { HomeService } from './home.serve';
import { ProjectPage } from '../project/project'
import { loginPage } from '../login/login'
import { noticePage } from './notice/notice'
import { NoCode } from './nocode/nocode';
import { codePage } from './code/code'
import { roomPage } from './room/room'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public login: string = "在线"
  public userName: string;
  constructor(
    public _alert: _alertBomb,
    public navCtrl: NavController,
    public Home: HomeService,
    public Storage: StorageService,
    public modalCtrl: ModalController,
    public params: NavParams,
    public barcode: BarcodeScanner
  ) {

  }
  ionViewDidEnter() {
    this.Storage.GetStorage("userLogin").subscribe(res => {
      res.then(val => {
        const User = val
        // console.log( )
        if (!User) {
          let profileModal = this.modalCtrl.create(loginPage);
          profileModal.present();
          profileModal.onDidDismiss(data => {
            this.userName = data.userName
          });
        } else {
          this.userName = User.userName
        }
      })
    })
  }
  newpage(parpam, event) {
    // console.log(event)
    this.navCtrl.push(ProjectPage, { "num": parpam })
    // this.Home.setgender(parpam)

  }
  //查询
  newyang() {
    this.navCtrl.push(noticePage)
  }
  //扫描入库
  scan() {
    var parpam = {
      title: "",
      subTitle: "是否有扦样条形码？",
      buttons: [
        {
          text: "无条形码",
          handler: () => {
            this.navCtrl.push(NoCode)
          }
        },
        {
          text: "有条形码",
          handler: () => {
            this.barcode.scan().then(barcodeData => {
              console.log(barcodeData)
              if (barcodeData.cancelled) {
                console.log("User cancelled the action!");
                return false;
              } else {
                this.navCtrl.push(codePage, { "codenumber": 600101251 })
              }
            }).catch(err => {

            });
          },
        }
      ],
      cssClass: "outsuccse"
    }
    var addbuton = {
      text: null
    }
    var addInput = []
    this._alert._alertSmlpe(parpam, addbuton, addInput, function (data) { })
  }
  //入库管理
  room() {
    this.navCtrl.push(roomPage)
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
  // this._alert._alertSmlpe(parpam, addbuton, addInput, function (data) { })
  // }
}
