import { Component } from "@angular/core";
import { NavParams, NavController } from "ionic-angular";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HttpService } from '../../../../../providers/httpService'
import { _alertBomb } from '../../../../common/_alert'


@Component({
    selector: "transfer",
    templateUrl: "./transfer.html"
})

export class transferPage {
    private sample;
    private _sample;
    private select_sample;
    private counter;
    private select_counter;
    private places;
    private select_places;
    constructor(
        private params: NavParams,
        private barcode: BarcodeScanner,
        private Http: HttpService,
        private navCtrl: NavController,
        public _alert: _alertBomb,
    ) {
        this.sample = this.params.get("sample")
    }
    ionViewDidEnter() {
        this.Http.post("grain/warehouse/getAll").subscribe(res => {
            this._sample = res.json()
        })
    }
    getbarcode() {
        this.barcode.scan().then(barcodeData => {
            if (barcodeData.cancelled) {
                return false;
            } else {
                var textflag = barcodeData.text
                this.selectSample()
                this.select_counter = textflag
                if (textflag >= "1" && textflag <= "11") {
                    this.select_sample = 1
                } else if (textflag >= "12" && textflag <= "22") {
                    this.select_sample = 2
                } else {
                    this.select_sample = 3
                }
                let params = {
                    counterId: textflag
                }
                this.Http.post("grain/warehouseCounterPlace/findPlaces", params).subscribe(res => {
                    this.select_places = ""
                    if (res.json()["length"]) {
                        this.places = res.json()
                    } else {
                        var parpam = {
                            title: "提示",
                            subTitle: "此柜子已满,请重新选择",
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
                // let paramsedit = {
                //     oldPlaceId: this.sample[0].placeId,
                //     placeId: barcodeData.text,
                //     id: this.sample[0].id
                // }
                // this.Http.post("grain/sample/editPlace", paramsedit).subscribe(res => {
                //     this.navCtrl.pop()
                // })
            }
        }).catch(err => {

        });
    }
    selectSample() {
        this.counter = []
        let params = {
            pId: this.select_sample
        }
        this.Http.post("grain/warehouseCounter/data", { params: JSON.stringify(params) }).subscribe(res => {
            this.counter = res.json()["rows"]
        })
    }
    selectcounter() {
        let params = {
            counterId: this.select_counter
        }
        this.Http.post("grain/warehouseCounterPlace/findPlaces", params).subscribe(res => {
            this.select_places = ""
            if (res.json()["length"]) {
                this.places = res.json()
            } else {
                var parpam = {
                    title: "提示",
                    subTitle: "此柜子已满,请重新选择",
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
    clear() {
        this.navCtrl.pop()
    }
    submit() {
        let params = {
            oldPlaceId: this.sample[0].placeId,
            placeId: this.select_places,
            id: this.sample[0].id
        }
        this.Http.post("grain/sample/editPlace", params).subscribe(res => {
            this.navCtrl.pop()
        })

    }
}