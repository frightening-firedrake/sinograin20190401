import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, IonicPage } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { _alertBomb } from '../common/_alert'
import { StorageService } from '../../providers/locationstorageService'
import { HttpService } from '../../providers/httpService'

import { AuthorityService } from '../../providers/authority'
import { ProjectPage } from '../project/project'
import { loginPage } from '../login/login'
import { noticePage } from './notice/notice'
import { NoCode } from './nocode/nocode';
import { codePage } from './code/code'
import { roomPage } from './room/room'
import { ReverNocodePage } from './revert/nocode/nocode'
import { RevercodePage } from "./revert/code/code"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public login: string = "在线"
  public userName: string;
  public XMNumber: string;
  public YMNumber: string;
  public SYYNumber: string;
  constructor(
    public _alert: _alertBomb,
    public navCtrl: NavController,
    public Authority: AuthorityService,
    public Storage: StorageService,
    public modalCtrl: ModalController,
    public params: NavParams,
    public barcode: BarcodeScanner,
    public Http: HttpService
  ) {
    // this.Http.post("grain/sample/getAll").subscribe(res => {
    //   try {
    //     res.json()
    //   } catch (e) {
    //     this.loginModel()
    //   }
    // })
  }
  ionViewDidEnter() {
    this.Storage.GetStorage("userLogin").subscribe(res => {
      res.then(val => {
        const User = val
        // console.log( )
        if (!User) {
          this.loginModel()
        }
      })
    })
    //获取统计
    this.Http.get("grain/sample/getAllCereals").subscribe(res => {
      // console.log(res)
      let respon = res.json()
      this.XMNumber = (respon["XMNumber"] / 10000).toFixed(2)
      this.YMNumber = (respon["YMNumber"] / 10000).toFixed(2)
      this.SYYNumber = (respon["SYYNumber"] / 10000).toFixed(2) || "0"
    })
  }
  newpage(parpam, event) {
    this.Authority.validate("扦样员").then(() => {
      this.navCtrl.push(ProjectPage, { "num": parpam })
    })
  }
  //查询
  newyang() {
    this.Authority.validate("超级管理员").then(() => {
      this.navCtrl.push(noticePage, { roleName: this.Authority.roleName })
    })
  }
  // 样品归还
  revert() {
    this.Authority.validate("库管员").then(() => {
      var parpam = {
        title: "是否有扦样条形码？",
        subTitle: "",
        buttons: [
          {
            text: "无条形码",
            handler: () => {
              setTimeout(() => {
                this.alertModel()
              }, 50)
            }
          },
          {
            text: "有条形码",
            handler: () => {
              this.navCtrl.push(RevercodePage)
              // this.barcode.scan().then(barcodeData => {
              //   if (barcodeData.cancelled) {
              //     console.log("User cancelled the action!");
              //     return false;
              //   } else {
              //     let params = {
              //       sampleNo: barcodeData.text
              //     }
              //     this.Http.post("grain/sample/getBySampleNo", params).subscribe(res => {
              //       if (res.json()["sampleState"] == 1) {
              //         this.navCtrl.push(codePage, { "codenumber": res.json() })
              //       } else {
              //         var parpam = {
              //           title: '提示',
              //           subTitle: "此样品已入库",
              //           buttons: [
              //             {
              //               text: "确认",
              //               handler: () => {

              //               }
              //             }
              //           ],
              //           cssClass: "outsuccse only"
              //         }
              //         var addbuton = {
              //           text: null
              //         }
              //         var addInput = []
              //         this._alert._alertSmlpe(parpam, addbuton, addInput, function (data) { })
              //       }
              //     })

              //   }
              // }).catch(err => {

              // });
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
    })
  }
  //扫描入库
  scan() {
    this.Authority.validate("库管员").then(() => {
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
                  let params = {
                    sampleNo: barcodeData.text
                  }
                  this.Http.post("grain/sample/getBySampleNo", params).subscribe(res => {
                    if (res.json()["sampleState"] == 1) {
                      this.navCtrl.push(codePage, { "codenumber": res.json() })
                    } else {
                      var parpam = {
                        title: '提示',
                        subTitle: "此样品已入库",
                        buttons: [
                          {
                            text: "确认",
                            handler: () => {

                            }
                          }
                        ],
                        cssClass: "outsuccse only"
                      }
                      var addbuton = {
                        text: null
                      }
                      var addInput = []
                      this._alert._alertSmlpe(parpam, addbuton, addInput, function (data) { })
                    }
                  })

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
    })
  }
  //入库管理
  room() {
    this.Authority.validate("库管员").then(() => {
      this.navCtrl.push(roomPage)
    })
  }
  loginModel() {
    let profileModal = this.modalCtrl.create(loginPage);
    profileModal.present();
    profileModal.onDidDismiss(data => {
      this.userName = data.userName
      //获取统计
      this.Http.get("grain/sample/getAllCereals").subscribe(res => {
        // console.log(res)
        let respon = res.json()
        this.XMNumber = (respon["XMNumber"] / 10000).toFixed(2)
        this.YMNumber = (respon["YMNumber"] / 10000).toFixed(2)
        this.SYYNumber = (respon["SYYNumber"] / 10000).toFixed(2) || "0"
      })
    });
  }

  alertModel() {
    var parpam = {
      title: '无条形码',
      subTitle: "检验编号:",
      buttons: [
        {
          text: '确认',
          handler: data => {
            // sample/data   params
            let handparams = {
              sampleNum: data.sampleNum
            }
            //获取领取人
            this.Http.post("/grain/handover/getBySampleNum", handparams).subscribe(res => {
              let respon = res.json()
              if (respon) {
                //获取样品信息
                let params = {
                  sampleNum: data.sampleNum
                }
                this.Http.post('/grain/sample/data', { params: JSON.stringify(params) }).subscribe(res => {
                  let datares = res.json()
                  if (datares["total"]) {
                    datares["rows"][0].receiptor = respon["rows"][0].receiptor
                    this.navCtrl.push(ReverNocodePage, { sampleNum: datares["rows"][0] })
                  } else {
                    this.revertModel()
                  }
                })
              } else {
                this.revertModel()
              }
            })
            // this.Http.post('/grain/sample/data', { params: JSON.stringify(params) }).subscribe(res => {
            //   let respon = res.json()
            //   if (respon["total"]) {
            //     this.navCtrl.push(ReverNocodePage, { sampleNum: respon["rows"][0] })
            //   } else {
            //     this.revertModel()
            //   }
            // })
          }
        },
        {
          text: '取消',
          handler: data => {

          }
        }
      ],
      cssClass: "outsuccse input",
      inputs: [
        {
          name: 'sampleNum',
          type: "text",
          placeholder: '请输入检验编号'
        },
      ]
    }
    var addbuton = {
      text: null
    }
    var addInput = []
    this._alert._alertSmlpe(parpam, addbuton, addInput, data => { })
  }
  revertModel() {
    var parpam = {
      title: '提示',
      subTitle: "此样品暂无领取信息",
      buttons: [
        {
          text: "确认",
          handler: () => {

          }
        }
      ],
      cssClass: "outsuccse only"
    }
    var addbuton = {
      text: null
    }
    var addInput = []
    this._alert._alertSmlpe(parpam, addbuton, addInput, function (data) { })
  }
}
