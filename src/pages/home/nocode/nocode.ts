import { Component } from '@angular/core';
import { NavController } from 'ionic-angular'
import { _alertBomb } from '../../common/_alert'
import { HttpService } from '../../../providers/httpService'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { NativeService } from '../../../providers/nativeService';
import { BLE } from '@ionic-native/ble';

import { libraryPage } from './library/library'
declare var cordova;
@Component({
    selector: "nocode",
    templateUrl: "./nocode.html"
})

export class NoCode {
    _zhishuku = "请选择直属库";
    _kudianId;
    _kudian = "请选择库点";
    Companyarr;
    samplylist;
    _huoweihao;
    _number;
    _chandi;
    dataTime;
    nocode;
    librarys;
    _beizhu;
    _creatTime;
    gendrslist;
    _xinzhi = "请选择性质";
    _pinzhong;
    formdata = {
        beizhu: "",
        pinzhong: "",
        zhishuku: "",
        kudian: ""
    }
    addButton = {
        text: ""
    }
    constructor(
        private _alert: _alertBomb,
        private Http: HttpService,
        public FormBuilder: FormBuilder,
        private navCtrl: NavController,
        private ble: BLE,
        private nativeService: NativeService,
    ) {
        // 直属库
        let Company = {
            params: `{"pLibraryId": "-1","page":"1","rows":"100"}`
        }
        this.Http.post("grain/library/getAll", Company).subscribe(res => {
            this.samplylist = res.json()
            this.Companyarr = this.samplylist.filter((i, v) => {
                return i.pLibraryId == -1
            })
        })
        this.nocode = this.FormBuilder.group({
            beizhu: ["", Validators.required],
            pingzhong: ["", Validators.required],
            zhishuku: ["", Validators.required],
            kudian: ["", Validators.required]
        })
        this._beizhu = this.nocode.controls["beizhu"]
        this._pinzhong = this.nocode.controls["pingzhong"]
        this._zhishuku = this.nocode.controls["zhishuku"]
        this._kudian = this.nocode.controls["kudian"]
    }
    ionViewDidEnter() {
        //置空
        // this._zhishuku = ""
        // this._kudian = ""
        this._huoweihao = ""
        // this._pinzhong = ""
        this._xinzhi = ""
        this._number = ""
        this._chandi = ""
        this.dataTime = ""
        this.nocode.value.beizhu = null
    }
    zhishuku() {
        const parpam = {
            title: "请选择直属库",
        }
        const addInput = []
        this.Companyarr.forEach((v, i) => {

            addInput.push({
                type: 'radio',
                label: v.libraryName,
                value: v.id,
            })
        })
        this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
            this.librarys = this.Companyarr.filter((v, i) => {
                return v.id == data.value
            })
            this.formdata.zhishuku = this.librarys[0].libraryName
            // this.nocode.value.zhishuku = this.librarys[0].libraryName
        })
    }
    kudian() {
        try {
            this.gendrslist = this.samplylist.filter((v, i) => {
                return v.pLibraryId == this.librarys[0].id
            })
            const parpam = {
                title: "请选择库点",
            }
            const addInput = []
            this.gendrslist.forEach((v, i) => {
                addInput.push({
                    type: 'radio',
                    label: v.libraryName,
                    value: v.id,
                })
            });
            this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
                var kudianname = this.gendrslist.filter((v, i) => {
                    return v.id == data.value
                })
                this.formdata.kudian = kudianname[0].libraryName
                this._kudianId = kudianname[0].id
            })
        }
        catch (error) {
            var parpam = {
                title: "提示",
                subTitle: "请先选择直属库",
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
    pinzhong() {
        const parpam = {
            title: "请选择品种",
        }
        const addInput = [
            {
                type: 'radio',
                label: '小麦',
                value: '1',
            },
            {
                type: 'radio',
                label: '玉米',
                value: '2'
            },
        ]
        this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
            this.formdata.pinzhong = data.value
            if (data.value == 1) {
                this.nocode.value.pingzhong = "小麦"
            } else {
                this.nocode.value.pingzhong = "玉米"
            }
        })
    }
    xinzhi() {
        const parpam = {
            title: "请选择性质",
        }
        const addInput = [
            {
                type: 'radio',
                label: 'ZC',
                value: 'ZC',
            },
            {
                type: 'radio',
                label: 'ZD',
                value: 'ZD'
            },
            {
                type: 'radio',
                label: 'LC',
                value: 'LC',
            },
            {
                type: 'radio',
                label: 'SP',
                value: 'SP'
            },
            {
                type: 'radio',
                label: 'TD',
                value: 'TD',
            },
        ]
        this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
            this._xinzhi = data.value
        })
    }
    pop() {
        this.navCtrl.pop()
    }
    onSubmit(nocode) {
        //  let params = {
        //     position: this._huoweihao,
        //     sort: nocode.value.pingzhong,
        //     quality: this._xinzhi,
        //     amount: this._number,
        //     originPlace: this._chandi,
        //     gainTime: this.dataTime,
        //     remark: nocode.value.beizhu,
        //     otherState: 1,
        //     libraryId: this._kudianId//提交时候会去value但value不是id而是文字
        // }
        // this.Http.post("grain/sample/saveRuku", params).subscribe(res => {
        //     console.log(res)
        // })
        this.nativeService.showLoading()
        this.ble.enable().then(() => {
            this.ble.startScan([]).subscribe(res => {
                if (res.name == 'HM-Z3') {
                    this.printf(res.id)
                    setTimeout(() => { return 0 }, 1000)
                    this.Bleprint(nocode)
                }
            })
        }).catch(() => {
            this.nativeService.hideLoading()
            let parpam = {
                title: "提示",
                subTitle: "暂未搜索到打印设备",
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
        })
    }
    printf(name) {
        this.nativeService.hideLoading()
        this.ble.stopScan()
        cordova.plugins.barcode.open(name)
    }
    Bleprint(nocode) {
        let params = {
            position: this._huoweihao,
            sort: nocode.value.pingzhong,
            quality: this._xinzhi,
            amount: this._number,
            originPlace: this._chandi,
            gainTime: this.dataTime,
            remark: nocode.value.beizhu,
            otherState: 1,
            libraryId: this._kudianId//提交时候会去value但value不是id而是文字
        }

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
                        this.Http.post("grain/sample/saveRuku", params).subscribe(respon => {
                            cordova.plugins.barcode.printBarCode(respon.json()["sampleNo"], "300", "0", "50", "180","3", res => {
                                this.navCtrl.push(libraryPage, { "testnum": respon.json() })
                                // this.Httpupdate()
                            }, err => {
                                // })
                            })
                            // this._ble()

                        })
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

    }
}