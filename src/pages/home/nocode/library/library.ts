import { Component, Input } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { DatePipe } from "@angular/common";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { _alertBomb } from '../../../common/_alert'
import { HttpService } from '../../../../providers/httpService'
import { StorageService } from '../../../../providers/locationstorageService'

@Component({
    templateUrl: "library.html",
    selector: "library",
    providers: [DatePipe],
})

export class libraryPage {
    testnum;
    data;
    userName;
    library: any;
    _position;
    _positionlist;
    @Input() number = "检验编号";
    @Input() numbercon
    constructor(
        private params: NavParams,
        private datePipe: DatePipe,
        public barcode: BarcodeScanner,
        public Storage: StorageService,
        private _alert: _alertBomb,
        private Http: HttpService,
        private navCtrl: NavController
    ) {
        this.testnum = this.params.get("testnum")
        this.numbercon = this.testnum ? this.testnum : ""
        this.data = this.datePipe.transform(new Date(), "MM/dd/yyyy");
        this.Storage.GetStorage("userLogin").subscribe(res => {
            res.then(res => {
                this.userName = res.userName
            })
        })
    }
    scand() {
        this.barcode.scan().then(barcodeData => {
            let paramsPlaces = {
                counterId: barcodeData.text//柜子的id
            }
            this.Http.post("grain/warehouseCounterPlace/findPlaces", paramsPlaces).subscribe(res => {
                if (!res.json()["length"]) {
                    var parpam = {
                        title: "提示",
                        subTitle: "此柜已满，请重新扫描",
                        buttons: [
                            {
                                text: "确认",
                                handler: () => {

                                }
                            },

                        ],
                        cssClass: "outsuccse only"
                    }
                    var addbuton = {
                        text: null
                    }
                    var addInput = []
                    this._alert._alertSmlpe(parpam, addbuton, addInput, function (data) { })
                } else {
                    //返回的是柜子的容量
                    this.library = paramsPlaces.counterId + "号柜"
                    this._positionlist = res.json()
                }

            }, error => {
                var parpam = {
                    title: "提示",
                    subTitle: "扫描的柜号错误，请重新扫描",
                    buttons: [
                        {
                            text: "确认",
                            handler: () => {

                            }
                        },

                    ],
                    cssClass: "outsuccse only"
                }
                var addbuton = {
                    text: null
                }
                var addInput = []
                this._alert._alertSmlpe(parpam, addbuton, addInput, function (data) { })
            })
            // this.navCtrl.push(libraryPage, { "testnum": res.json() })

            // var parpam = {
            //     title: "入库成功",
            //     subTitle: `已成功入库${barcodeData.text},<br>是否继续入库操作`,
            //     buttons: [
            //         {
            //             text: "返回首页",
            //             handler: () => {
            //                 this.navCtrl.popToRoot()
            //             }
            //         },
            //         {
            //             text: "继续",
            //             handler: () => {
            //                 this.navCtrl.pop()
            //             },
            //         }
            //     ],
            //     cssClass: "outsuccse succse"
            // }
            // var addbuton = {
            //     text: null
            // }
            // var addInput = []
            // this._alert._alertSmlpe(parpam, addbuton, addInput, function (data) { })
            // this.library = barcodeData.text
            // }).catch(err => {
            //     console.log('Error', err);
            // });
        })
    }
    place() {
        let placeparams = {
            autograph: this.userName,
            id: this.testnum ? this.testnum.id : this.numbercon.id,
            placeId: this._positionlist[0].place
        }
        var parpam = {
            title: "请确认存放位置",
            subTitle: `存放位置为${this.library}-${this._positionlist[0].place}号位`,
            buttons: [

                {
                    text: "取消",
                    handler: () => {

                    },
                },
                {
                    text: "确认",
                    handler: () => {
                        this.Http.post("grain/sample/saveRukuXinxi", placeparams).subscribe(res => {
                            this.submitRuku()
                        })

                    }
                },
            ],
            cssClass: "outsuccse succse"
        }
        var addbuton = {
            text: null
        }
        var addInput = []
        this._alert._alertSmlpe(parpam, addbuton, addInput, function (data) { })

    }
    submitRuku() {
        var parpam = {
            title: "入库成功",
            subTitle: `已成功入库${this.library}-${this._positionlist[0].place}号位,<br>是否继续入库操作`,
            buttons: [
                {
                    text: "返回首页",
                    handler: () => {
                        this.navCtrl.popToRoot()
                    }
                },
                {
                    text: "继续",
                    handler: () => {
                        this.navCtrl.pop()
                    },
                }
            ],
            cssClass: "outsuccse succse"
        }
        var addbuton = {
            text: null
        }
        var addInput = []
        this._alert._alertSmlpe(parpam, addbuton, addInput, function (data) { })
    }
}