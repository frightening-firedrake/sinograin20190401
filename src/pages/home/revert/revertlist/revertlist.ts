import { Component, Input } from "@angular/core";
import { DatePipe } from "@angular/common";
import { HttpService } from '../../../../providers/httpService'
import { NavController, NavParams } from "ionic-angular";
import { _alertBomb } from '../../../common/_alert'
import { SamllSamplePage } from '../samllsample/samllsample'

@Component({
    selector: "Revertlist",
    templateUrl: "revertlist.html",

})

export class Revertlist {
    prompt = {
        content: "请使用归还单上的编号进行搜索"
    }
    promptflag = false;
    myInput;
    flag = 0;
    _handoverlist;
    constructor(
        private Http: HttpService,
        private _alert: _alertBomb,
        private params: NavParams,
        private navCtrl: NavController
    ) {

    }
    search() {
        let params = {
            id: this.myInput
        }
        this.Http.post("grain/handover/getStorage", params).subscribe(res => {
            try {
                this._handoverlist = [res.json()]
                this.promptflag = true
            } catch (e) {
                var parpam = {
                    title: "提示",
                    subTitle: "请输入正确的编号",
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
    binggon(evens) {
        if (evens.returnState == 1) {
            var parpam = {
                title: "提示",
                subTitle: "该样品领取交接单已经归还",
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
            this.navCtrl.push(SamllSamplePage, { "sample": this._handoverlist })
        }
    }
}
