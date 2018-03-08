import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { BLE } from '@ionic-native/ble';
import { NativeService } from '../../../providers/nativeService';
import { _alertBomb } from '../../common/_alert'
import { HttpService } from '../../../providers/httpService'
import { detailsWorkPage } from './detailsWork/detailsWork'
import { detaSafePage } from './detailsSafe/detailsSafe'
import { APP_SERVE_URL } from "../../../providers/config";

declare var cordova;
@Component({
    selector: "derails",
    templateUrl: "./details.html"
})

export class detaildPage {
    classify: any
    Safe_img = [];
    sample: any
    dateStr: string
    data: any;
    Work: any;
    Work_flag = true;
    ble_falg = false
    Safe: any;
    devices: any;
    device: any;
    characteristics: any;
    serviceUUID: any;
    characteristicUUID: any;
    deviceId: any;
    buffered;
    Safe_flag = true;
    sampleId;
    private pringarr = ["8C:DE:52:FA:A6:19"]
    constructor(
        public params: NavParams,
        public _alert: _alertBomb,
        public Http: HttpService,
        public BLE: BLE,
        public navCtrl: NavController,
        private nativeService: NativeService,
    ) {
        this.devices = [];
        this.serviceUUID = "1800";
        this.characteristicUUID = "180a";
        this.classify = "new"
        this.sample = this.params.get('json')
        console.log(this.sample)
        //工作底稿的数据
        this.sampleId = {
            params: `{"sampleId":"${this.sample.id}"}`
        }
        this.Http.post("/grain/manuscript/data", this.sampleId).subscribe(res => {
            console.log(res.json())
            let work = res.json()
            // console.log(work["rows"].length)
            if (work["rows"].length) {
                this.Work_flag = true
                this.Work = work["rows"][0]
            } else {
                this.Work_flag = false
            }
        })
        // 安全报告的数据
        this.Http.post("/grain/safetyReport/data", this.sampleId).subscribe(res => {
            console.log(res.json())
            let safe = res.json()
            if (safe["rows"].length) {
                this.Safe_flag = true
                this.Safe = safe["rows"]
                console.log(this.Safe[0].images.split(","))
                this.Safe[0].images.split(",").forEach((i, v) => {
                    this.Safe_img.push(`${APP_SERVE_URL}grain/upload/picture/${i}`)
                })
            } else {
                this.Safe_flag = false
            }

        })
        // safetyReport/data
    }
    ionViewDidEnter() {
        // alert(111)
        // this.BLE.showBluetoothSettings()        

        // this.nativeService.showLoading();

    }
    // 没有工作底稿的时候
    Workdetails() {
        this.navCtrl.push(detailsWorkPage, { "params": this.sample })
    }
    // 没有安全报告的时候
    Safedetails() {
        this.navCtrl.push(detaSafePage, { "params": this.sample })
    }
    // 扦样信息中的打印条形码的功能
    _sample() {
        this.nativeService.showLoading()
        // this._ble()
        this.BLE.enable();
        var flag = false;
        var time = 0;
        var is_conn = false;
        this.BLE.startScan([]).subscribe(res => {
            console.log(res)
            if (res.name == "HM-Z3" && !flag) {
                flag = true;
                var ble_mac = res.id;
                console.log(ble_mac, flag)
                this.print(ble_mac);
                setTimeout(function () { return 0 }, 1000);
                this._ble(res => {
                    let parpam = {
                        id: this.sample.id,
                        sampleState: 1
                    }
                    this.Http.post("/grain/sample/edit", parpam).subscribe(res => {
                        this.data = res.json()

                        if (this.data.success) {
                            let params = {
                                title: "提示",
                                subTitle: "扦样成功",
                                buttons: [
                                    {
                                        text: "确认",
                                        handler: () => {
                                        }
                                    }
                                ],
                                cssClass: "outsuccse only"
                            }
                            let addbuton = {
                                text: null
                            }
                            let addInput = []
                            this._alert._alertSmlpe(params, addbuton, addInput, data => {
                                console.log(data)
                            })
                            this.sample.sampleState = 1
                        }
                    })
                });
            }
        })
    }
    print(ble_mac) {
        console.log(ble_mac)
        this.BLE.stopScan()
        cordova.plugins.barcode.open(ble_mac, res => {
            console.log("js" + res)
            this.nativeService.hideLoading();
            let parpam = {
                title: "是否确认扦样",
                subTitle: "此操作不可逆，请谨慎选择",
                buttons: [
                    {
                        text: '取消',
                        // role: 'destructive',
                        handler: () => {

                        }
                    },
                    {
                        text: '确认',
                        //   role: 'destructive',
                        handler: () => {
                            // this._ble()
                        }
                    }
                ],
                cssClass: "outsuccse succse"
            }
            let addbuton = {
                text: null
            }
            let addInput = []
            this._alert._alertSmlpe(parpam, addbuton, addInput, data => {
                return 0
            })
        }, err => {
            console.log("nojs" + err)
            this.nativeService.hideLoading();
            alert("请关闭蓝牙重新连接")
            this.ble_falg = true
        })
    }
    _ble(callback) {
        let data = {
         "id":`${this.sample.id}`
        }
        this.Http.post("grain/sample/get",data).subscribe(res => {
            var urlpng = res.json()["samplePic"]
            console.log(urlpng)
            var url = `${APP_SERVE_URL}upload/barcode/${urlpng}`
            console.log(url)
            cordova.plugins.barcode.printBarCode(url, "0", "200", "200", "300", res => {
                // this.Httpupdate()
                callback()
            }, err => {
                console.log(err)
            })
        })


        // this.BLE.enable();
        // this.nativeService.showLoading();
        // // this.connect("8C:DE:52:FA:A6:19")
        // console.log("扫描开始");
        // // this.devices = [];

        // this.BLE.startScan([]).subscribe(device => {
        //     this.devices.push(device);
        //     console.log("扫描结果" + JSON.stringify(device))
        //     this.pringarr.forEach((i, v) => {
        //         if (device.id = i) {
        //             console.log("ID" + device.id)
        //             console.log(device)
        //             // this.ble_falg = true
        //             this.connect(device)
        //         }
        //     })
        //     //  this.sendMsg(device,"jfsdkfsjdkfdsjk")
        // },
        //     err => {
        //         console.log("扫描结果" + JSON.parse(err))
        //         //this.message = "Error";
        //     });

        // setTimeout(() => {
        //     this.BLE.stopScan().then(
        //         function () { console.log("扫描完成"); },
        //         function () { console.log("扫描失败"); }
        //     )
        // }, 5000);

    }
    connect(device) {
        this.characteristics = [];
        console.log(device)
        // cordova.plugins.barcode.open(device.id, res => {
        //             this.nativeService.hideLoading();

        //         }, err => {
        //             alert("请关闭蓝牙重新连接")
        //         })

    }
    // _ble() {
    //     this.BLE.enable();
    //     // this.BLE.showBluetoothSettings()
    //     console.log("扫描开始");
    //     this.devices = [];
    //     this.BLE.startScan([]).subscribe(device => {
    //         // this.devices.push(device);
    //         console.log("扫描结果" + JSON.stringify(device))
    //         // this.connect(device)
    //         //  this.sendMsg(device,"jfsdkfsjdkfdsjk")
    //     },
    //         err => {
    //             console.log("扫描结果" + JSON.parse(err))
    //             //this.message = "Error";
    //         });

    //     setTimeout(() => {
    //         this.BLE.stopScan().then(
    //             function () { console.log("扫描完成"); },
    //             function () { console.log("扫描失败"); }
    //         )
    //     }, 5000);

    // }

    // connect(device) {
    //     this.characteristics = [];
    //     console.log(device)
    //     this.BLE.connect(device.id).subscribe(peripheralData => {
    //         console.log("链接结果" + JSON.stringify(peripheralData.characteristics));
    //         console.log(peripheralData)
    //         this.characteristics = peripheralData;
    //         this.deviceId = device.id;
    //         this.BLE.isConnected(device.id).then(
    //             res => {
    //                 console.log("设备链接状态" + res)
    //             },
    //             err => {
    //                 console.log("设备链接状态" + err)
    //             }
    //         )

    //         var str = 'data:image/png;base64,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'
    //         // var str = "fasdfsd"
    //         this.sendMsg(device, str)
    //     },
    //         peripheralData => {
    //             console.log('链接断开');
    //         });
    // }

    // sendMsg(deviceId, data: any) {
    //     console.log("项目链接成功开始打印")
    //     var that = this
    //     let dataToSend = this.stringToBytes(data);
    //     //将字符串转换成 Blob对象
    //     //将Blob 对象转换成 ArrayBuffer
    //     var reader = new FileReader();
    //     reader.readAsArrayBuffer(dataToSend);
    //     reader.onload = function (e) {

    //     // console.info(reader.result); //ArrayBuffer {}
    //     //经常会遇到的异常 Uncaught RangeError: byte length of Int16Array should be a multiple of 2
    //     //var buf = new int16array(reader.result);
    //     //console.info(buf);

    //     //将 ArrayBufferView  转换成Blob
    //     var buf = new Uint16Array(reader.result);
    //     console.info(buf);
    //     console.info(buf.buffer); //[228, 184, 173, 230, 150, 135, 229, 173, 151, 231, 172, 166, 228, 184, 178]
    //     console.log(that.characteristics)
    //     that.BLE.write(deviceId.id, that.characteristics.services[2], that.characteristics.characteristics[14].characteristic, buf.buffer).then(
    //         res => {
    //             console.log("打印成功"+res)
    //             console.log(res)
    //             that.BLE.disconnect(deviceId.id)
    //         },err=>{
    //             console.log("打印失败")
    //             console.log(err)
    //             that.BLE.disconnect(deviceId.id)
    //         })
    //     }

    // }

    // stringToBytes(dataurl: string) {
    //     var arr = dataurl.split(','), mime = arr[0].match(/(.*?);/)[1],
    //         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    //     while (n--) {
    //         u8arr[n] = bstr.charCodeAt(n);
    //     }
    //     return new Blob([u8arr], { type: mime });
    // }
}