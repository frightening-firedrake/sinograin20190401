import { Component,Input } from '@angular/core';
import { NavParams,NavController } from 'ionic-angular';
import { DatePipe } from "@angular/common";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { _alertBomb } from '../../../common/_alert'
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
    @Input() number = "样品编号";
    @Input() numbercon = this.testnum;
    constructor(
        private params: NavParams,
        private datePipe: DatePipe,
        public barcode: BarcodeScanner,
        public Storage: StorageService,
        private _alert: _alertBomb,
        private navCtrl: NavController
    ) {
        this.testnum = this.params.get("testnum")
        this.data = this.datePipe.transform(new Date(), "MM/dd/yyyy");
        this.Storage.GetStorage("userLogin").subscribe(res => {
            res.then(res => {
                this.userName = res.userName
            })
        })
    }
    scand() {
        this.barcode.scan().then(barcodeData => {
            var parpam = {
                title: "入库成功",
                subTitle: `已成功入库${barcodeData.text},<br>是否继续入库操作`,
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
            this.library = barcodeData.text
        }).catch(err => {
            console.log('Error', err);
        });
    }
}