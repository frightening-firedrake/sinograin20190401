import { Component } from "@angular/core";
import { NavParams, NavController } from "ionic-angular"
import { transferPage } from "../transfer/transfer";
import { HttpService } from '../../../../../providers/httpService'
import { _alertBomb } from '../../../../common/_alert'
import { StorageService } from '../../../../../providers/locationstorageService'
import { NativeService } from '../../../../../providers/nativeService';
import { BLE } from '@ionic-native/ble';

declare var cordova;
@Component({
    selector: "sampleDeatils",
    templateUrl: "details.html"
})
export class SampleDetailsPage {
    sample;
    _storage
    constructor(
        private params: NavParams,
        private navCtrl: NavController,
        private Http: HttpService,
        private _alert: _alertBomb,
        private Storage: StorageService,
        private nativeService: NativeService,
        private BLE: BLE
    ) {
        this.sample = this.params.get("sample")
        console.log(this.sample)
        Storage.GetStorage("userLogin").subscribe(res => {
            res.then(res => {
                this._storage = res.userName
            })
        })
        this.connect()
    }
    //转移
    transfer() {
        this.navCtrl.push(transferPage, {
            "sample": [this.sample]
        })
    }

    //处理
    handle() {
        console.log(this.sample)
        var parpam = {
            title: '处理',
            subTitle: "处理人签名:",
            buttons: [
                {
                    text: '确认',
                    handler: data => {
                        let params = {
                            // ids: id.join(),//处理样品的id
                            dispose: data.dispose,//人
                            disposeReason: data.disposeReason//事由
                        }
                        this.Http.post("grain/sample/dispose", params).subscribe(res => {
                            if (res.json()["success"]) {
                                var parpam = {
                                    title: "提示",
                                    subTitle: "处理成功",
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
                            } else {
                                var parpam = {
                                    title: "提示",
                                    subTitle: "处理失败,请重新选择",
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
                    name: 'dispose',
                    value: this._storage,
                    // label:"处理事由"
                    type: "text",
                    placeholder: '请输入处理人签名'
                },
                {
                    name: 'disposeReason',
                    // label:"处理事由"
                    type: "text",
                    placeholder: '请输入处理事由'
                },

            ]
        }
        var addbuton = {
            text: null
        }
        var addInput = []
        this._alert._alertSmlpe(parpam, addbuton, addInput, data => { })

    }
    connect() {
        this.nativeService.showLoading()
        // this._ble()
        this.BLE.enable().then(res => {
            this.BLE.startScan([]).subscribe(res => {
                console.log(res)
                if (res.name == "HM-Z3") {
                    var ble_mac = res.id;
                    this.open(ble_mac);
                    setTimeout(function () { return 0 }, 1000);
                }
            })
        }, err => {
            this.nativeService.hideLoading();
        })
    }
    open(ble_mac) {
        this.BLE.stopScan()
        cordova.plugins.barcode.open(ble_mac)
        this.nativeService.hideLoading();
    }
    print() {
        cordova.plugins.barcode.printBarCode(this.sample.sampleNum, "300", "0", "50", "180", "2", res => {
        }, err => {
        })
    }
}