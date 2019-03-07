import { Injectable } from "@angular/core";
import { BLE } from '@ionic-native/ble';
import { NativeService } from './nativeService';
import { _alertBomb } from '../pages/common/_alert'

declare var cordova;
var t
@Injectable()
export class BleServer {
    constructor(private ble: BLE, private nativeService: NativeService, private _alert: _alertBomb) {

    }
    private deviceId;
    private searchTime = 0
    //打开、搜索
    public search() {
        this.searchTime = 0
        this.nativeService.showLoading()
        t = setInterval(() => {
            console.log(this.searchTime)
            this.searchTime++
            if (this.searchTime == 3) {
                this.searchAlert()
            }
        }, 1000)
        return new Promise((resolve, reject) => {
            this.ble.enable().then(res => {
                cordova.plugins.barcode.registerReceiver(res => {
                    if (res.class == 1536) {
                        clearInterval(t)
                        this.connect(res.address)
                        setTimeout(function () {
                            console.log(1)
                        }, 1000);
                        cordova.plugins.barcode.unregisterReceiver()
                        resolve()
                    }
                }, err => {
                    console.log(err)
                    reject(err)
                })
                cordova.plugins.barcode.search(respon => {
                    console.log(respon)
                })
            })
        })
    }
    //连接
    private connect(ble_mac) {
        this.nativeService.hideLoading()
        cordova.plugins.barcode.open(ble_mac, success => {
            console.log(success)
            this.deviceId = ble_mac
        })
    }
    //打印
    public print(code) {
        return new Promise((resolve, reject) => {
            cordova.plugins.barcode.printBarCode(code, "300", "0", "50", "180", "2", res => {
                resolve()
            }, err => {
                reject()
            })
        })

    }
    private searchAlert() {
        let parpam = {
            title: "暂未发现蓝牙设备",
            subTitle: "请重新搜索",
            buttons: [
                {
                    text: "取消",
                    handler: () => {
                        cordova.plugins.barcode.unregisterReceiver()
                        clearInterval(t)
                        this.nativeService.hideLoading()
                        this.searchTime = 0
                    }
                },
                {
                    text: "确认",
                    handler: () => {
                        this.searchTime = 0
                    }
                }
            ],
            cssClass: " outsuccse succse"
        }
        var addbuton = {

        }
        var addInput = []
        this._alert._alertSmlpe(parpam, addbuton, addInput, data => { })
    }
}

