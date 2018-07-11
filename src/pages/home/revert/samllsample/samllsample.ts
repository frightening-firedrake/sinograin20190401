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
    constructor(
        private params: NavParams,
        private navCtrl: NavController,
        private Http: HttpService,
        private Barcode: BarcodeScanner,
        private _alert: _alertBomb
    ) {
        this.samllsamplelist = this.params.get("sample")[0]
        this.number = "编号" + this.params.get("sample")[0].id
    }
    revert() {
        var parpam = {
            title: '归还',
            subTitle: "归还人签名:",
            buttons: [
                {
                    text: '确认',
                    handler: data => {
                        let params = {
                            id: this.samllsamplelist.id,
                            returnPerson: data.Person,
                            returnState: 1,
                            sampleNums: this.samllsamplelist.sampleNums
                        }
                        this.Http.post("/grain/handover/guiHuan", params).subscribe(res => {
                            this.navCtrl.pop()
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
                    name: 'Person',
                    value: "",
                    // label:"处理事由"
                    type: "text",
                    placeholder: '请输入归还人签名'
                },
            ]
        }
        var addbuton = {
            text: null
        }
        var addInput = []
        this._alert._alertSmlpe(parpam, addbuton, addInput, data => { })
    }
    barcode() {

        this.Barcode.scan().then(barcodeData => {
            if (barcodeData.cancelled) {
                return false;
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
}

