import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { _alertBomb } from '../../../common/_alert'
import { transferPage } from './transfer/transfer'
import { StorageService } from '../../../../providers/locationstorageService'

@Component({
    templateUrl: "./sample.html",
    selector: "sample"
})

export class SamplePage {
    private _sample;
    private roomfalg = []
    private _storage;
    private room = [{
        id: 1,
        checked: false,
        num: "20180029",
        position: "1室-3号柜-01",
        auto: "Admin",
        Time: "2018.05"
    }, {
        id: 2,
        checked: false,
        num: "20180029",
        position: "1室-3号柜-01",
        auto: "Admin",
        Time: "2018.05"
    }]
    constructor(
        private params: NavParams,
        private _alert: _alertBomb,
        private navCtrl: NavController,
        private storage: StorageService
    ) {
        this._sample = this.params.get("_sample")
        this.storage.GetStorage("userLogin").subscribe(res => {
            res.then(res => {
                this._storage = res.userName
            })
        })
    }
    check(list) {
        list.checked = !list.checked
        if (list.checked) {
            this.roomfalg.push(list)
        } else {
            this.roomfalg = this.roomfalg.filter((v, i) => {
                return v.id != list.id
            })
        }
    }
    //处理
    handle() {
        var parpam = {
            title: '处理',
            subTitle: "处理理由:",
            buttons: [
                {
                    text: '确认',
                    handler: data => {
                        console.log(data);
                    }
                },
                {
                    text: '取消',
                    handler: data => {
                        console.log('Saved clicked');
                    }
                }
            ],
            cssClass: "outsuccse input",
            inputs: [
                {
                    name: 'title',
                    // label:"处理事由"
                    type: "etc",
                    placeholder: '请输入处理事由'
                },
                {
                    name: '签名',
                    value: this._storage,
                    // label:"处理事由"
                    type: "etc",
                    placeholder: '请输入签名'
                },
            ]
        }
        var addbuton = {
            text: null
        }
        var addInput = []
        this._alert._alertSmlpe(parpam, addbuton, addInput, function (data) { console.log(data) })
    }
    // const prompt = this._alert.create({
    //     title: '处理',
    //     subTitle: "处理理由",
    //     inputs: [
    //         {
    //             name: 'title',
    //             // label:"处理事由"
    //             placeholder: 'Title'
    //         },
    //     ],
    //     buttons: [
    //         {
    //             text: '确认',
    //             handler: data => {
    //                 console.log(data);
    //             }
    //         },
    //         {
    //             text: '取消',
    //             handler: data => {
    //                 console.log('Saved clicked');
    //             }
    //         }
    //     ],
    //     cssClass: "outsuccse input"
    // });
    //转移
    transfer() {
        if (this.roomfalg.length > 1) {
            var parpam = {
                title: "提示",
                subTitle: "每次只能有一个样品转移哦！",
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
            this.navCtrl.push(transferPage, { "sample": this.roomfalg })
        }
    }
    // 下拉刷新
    doRefresh(refresher) {
        // this.secondary()
        console.log(refresher)
        setTimeout(() => {
            refresher.complete();
        }, 2000);
    }
}