import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { _alertBomb } from '../../../common/_alert'
import { transferPage } from './transfer/transfer'
import { StorageService } from '../../../../providers/locationstorageService'
import { HttpService } from '../../../../providers/httpService'
import { SampleDetailsPage } from './details/details'


@Component({
    templateUrl: "./sample.html",
    selector: "sample"
})

export class SamplePage {
    private _sample;
    private roomfalg = []
    private _storage;
    private _update = false
    private room: any;
    constructor(
        private params: NavParams,
        private _alert: _alertBomb,
        private navCtrl: NavController,
        private storage: StorageService,
        public alertCtrl: AlertController,
        private Http: HttpService
    ) {
        this._sample = this.params.get("_sample")
        this.storage.GetStorage("userLogin").subscribe(res => {
            res.then(res => {
                this._storage = res.userName
            })
        })
    }
    ionViewDidEnter() {
        this.Http.post("grain/sample/getByCounterId ", { counterId: this.params.get("Counter") }).subscribe(res => {
            this.room = res.json()
            this.room.forEach(v => {
                v.checked = false
            })
        })
        this.roomfalg = []

        // console.log(this.roomfalg, this.room)
    }
    godetails(only){
        this.navCtrl.push(SampleDetailsPage,{
            sample:only
        })
    }
    check(event, list) {
        event.stopPropagation();
        list.checked = !list.checked
        if (list.checked) {
            this.roomfalg.push(list)
            // console.log(update)
            if (this.roomfalg.length == this.room.length) {
                this._update = true
            }
        } else {
            this._update = false
            this.roomfalg = this.roomfalg.filter((v, i) => {
                return v.id != list.id
            })
        }
    }
    //处理
    handle() {
        var parpam = {
            title: '处理',
            subTitle: "处理人签名:",
            buttons: [
                {
                    text: '确认',
                    handler: data => {
                        let id = [];
                        this.roomfalg.forEach(v => {
                            id.push(v.id)
                        })
                        let params = {
                            ids: id.join(),
                            dispose: data.dispose,//人
                            disposeReason: data.disposeReason//事由
                        }
                        this.Http.post("grain/sample/dispose", params).subscribe(res => {
                            if (res.json()["success"]) {
                                this.room = this.room.filter(v => {
                                    return v.checked == false
                                })
                                var parpam = {
                                    title: "提示",
                                    subTitle: "处理成功",
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
                                var parpam = {
                                    title: "提示",
                                    subTitle: "处理失败,请重新选择",
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
                    name: 'dispose',
                    value: this._storage,
                    // label:"处理事由"
                    type: "text",
                    placeholder: '请输入处理人签名'
                },
                {
                    name: 'disposeReason',
                    // label:"处理事由"
                    type: "text",
                    placeholder: '请输入处理事由'
                },
                
            ]
        }
        var addbuton = {
            text: null
        }
        var addInput = []
        this._alert._alertSmlpe(parpam, addbuton, addInput, data => { })

    }
    //全选
    updateall() {
        // console.log(!this._update)
        if (!this._update) {
            this.room.forEach(v => {
                v.checked = false
                this.roomfalg = []
                this._update = false
            })
        } else {
            this.room.forEach(v => {
                if (!v.checked) {
                    v.checked = true
                    this.roomfalg.push(v)
                    this._update = true
                }
            });
        }
    }
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
        this.ionViewDidEnter()
        setTimeout(() => {
            refresher.complete();
        }, 2000);
    }
}