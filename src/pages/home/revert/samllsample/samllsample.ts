import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { HttpService } from '../../../../providers/httpService'
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { _alertBomb } from '../../../common/_alert'

@Component({
    selector: "samllsample",
    templateUrl: "./samllsample.html"
})
export class SamllSamplePage {
    number;
    samllsamplelist;
    SamllSamplelistonly;
    samllsampleflag = false;
    samllsampleState;
    barcodeflag = true
    constructor(
        private params: NavParams,
        private navCtrl: NavController,
        private Http: HttpService,
        private Barcode: BarcodeScanner,
        private _alert: _alertBomb
    ) {
        this.samllsamplelist = this.params.get("sample")
        this.number = "编号" + this.params.get("sample").id
    }
    ionViewDidEnter() {
        this.init()
    }
    init() {
        let params = {
            id: this.params.get("sample").id
        }
        this.Http.post("grain/returnSingle/getStorage", params).subscribe(res => {
            try {
                this.samllsamplelist = res.json()
                this.samllsampleState = this.samllsamplelist.returnState
            } catch (e) {
                    this.navCtrl.pop()
            }
        })
    }
    revert() {
        let params = {
            id: this.samllsamplelist.id,
            returnState: 1
        }
        this.Http.post("grain/returnSingle/guihuan", params).subscribe(res => {
            this.navCtrl.pop()
        })
    }
    delect(list) {
        if (this.samllsamplelist.samples.length == 1) {
            var parpam = {
                title: "提示",
                subTitle: "此归还单仅剩一个样品<br/>删除后归还单相继删除",
                buttons: [
                    {
                        text: "确认",
                        handler: () => {
                            this.deletesubmit(list)
                        }
                    },
                    {
                        text: "取消",
                        handler: () => {

                        }
                    }
                ],
                cssClass: "outsuccse succse"
            }
            var addbuton = {
                text: null
            }
            var addInput = []
            this._alert._alertSmlpe(parpam, addbuton, addInput, function (data) { })
        } else {
            this.deletesubmit(list)
        }

    }
    ionViewCanLeave() {
        if (this.barcodeflag) {
            return true
        } else {
            return false
        }
    }
    barcode() {
        this.Barcode.scan().then(barcodeData => {
            if (barcodeData.cancelled) {
                this.barcodeflag = false
                setTimeout(() => {
                    this.barcodeflag = true
                }, 1000)
            } else {
                let params = {
                    sampleNo: barcodeData.text
                }
                this.Http.post("/grain/sample/data", { params: JSON.stringify(params) }).subscribe(res => {
                    this.samllsampleflag = true
                    this.SamllSamplelistonly = res.json()["rows"]
                })
            }
        })


    }
    pop() {
        this.samllsampleflag = false
    }
    deletesubmit(list) {
        let params = {
            id: this.samllsamplelist.id,
            sampleId: list.id
        }
        this.Http.post("grain/returnSingle/removeSampleId", params).subscribe(res => {
            if (res.json()["success"]) {
                var parpam = {
                    title: "提示",
                    subTitle: "删除成功",
                    buttons: [
                        {
                            text: "确认",
                            handler: () => {
                                this.init()
                            }
                        }
                    ],
                    cssClass: "outsuccse only"
                }
            } else {
                var parpam = {
                    title: "提示",
                    subTitle: "删除失败",
                    buttons: [
                        {
                            text: "确认",
                            handler: () => {
                                this.init()
                            }
                        }
                    ],
                    cssClass: "outsuccse only"
                }
            }
            var addbuton = {
                text: null
            }
            var addInput = []
            this._alert._alertSmlpe(parpam, addbuton, addInput, function (data) { })

        })
    }
}

