import { Injectable } from "@angular/core";
import { BLE } from '@ionic-native/ble';
import { NativeService } from './nativeService';

declare var cordova;
@Injectable()
export class BleServer {
    constructor(private ble: BLE, private nativeService: NativeService) {

    }
    private deviceId;
    //打开、搜索
    public search() {
        return new Promise((resolve, reject) => {
            this.nativeService.showLoading()
            this.ble.enable().then(res => {
                cordova.plugins.barcode.registerReceiver(res => {
                    console.log(res)
                    if (res.class == 1536) {
                        
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
}

