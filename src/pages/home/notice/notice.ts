import { Component } from "@angular/core";
import { NavController, NavParams } from 'ionic-angular'
import { HttpService } from '../../../providers/httpService'
import { noticeViewPage } from './notice_view/notice_view'
import { detaildPage } from '../../project/details/details'
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { sampleDetailsPage } from "./sampledetails/sampledetails"
import { AuthorityService } from '../../../providers/authority'
import { _alertBomb } from '../../common/_alert'

@Component({
    selector: "notice",
    templateUrl: "./notice.html"
})

export class noticePage {
    public roleName;
    gendrslist;
    myInput;
    rows = 11
    totle;
    promp = false
    promptObj = {
        content: ""
    }
    heardershow = true
    liststate;//1.扦样列表2.样品列表
    // classify:any
    // applye:string = "扦样申请"
    // system:string = "系统通知"
    constructor(
        public navCtrl: NavController,
        public Http: HttpService,
        public barcode: BarcodeScanner,
        public Authority: AuthorityService,
        public params: NavParams,
        public _alert: _alertBomb
    ) {
        // this.classify = "applye"
        // this.getList()
        this.roleName = this.params.get("roleName")
        if (this.roleName == "扦样员") {
            this.getList()
            this.liststate = 1
        } else if (this.roleName == "库管员") {
            this.getwarehouse()
            this.liststate = 2
        } else {
            this.heardershow = true
            this.promptObj.content = "请根据扦样编号与检验编号进行搜索"
        }
    }
    ionViewDidEnter() {

    }
    //样品编号
    getwarehouse() {
        this.promp = true
        this.Http.post("grain/sample/getAll").subscribe(res => {
            // this.totle = res.json()["total"]
            // // console.log(res.json(),"color:blue")
            this.gendrslist = res.json()
        })
    }
    //扦样编号
    getList() {
        this.promp = true
        var data = {
            params: `{"sampleState":1}`,
            rows: this.rows,
            page: "1"
        }
        this.Http.post("grain/sample/data", data).subscribe(res => {
            this.totle = res.json()["total"]
            // console.log(res.json(),"color:blue")
            this.gendrslist = res.json()["rows"]
        })
    }
    // 搜索扫描
    scan() {
        this.barcode.scan().then(barcodeData => {
            this.myInput = barcodeData.text
            this.secondary()
        }).catch(err => {
        });
    }
    // 搜索
    secondary() {
        var data
        if (this.roleName == '超级管理员') {
            if (this.myInput) {
                data = {
                    sampleWordOrsampleNumLike: this.myInput,
                    ruKuSampleState: 2,
                    fenxiaoyangSampleState: 3
                }
                this.Http.post("grain/sample/data", { params: JSON.stringify(data) }).subscribe(res => {
                    this.promp = true
                    // console.log(res.json())
                    let list = res.json()
                    // console.log(res.json(),"color:blue")
                    this.gendrslist = list["rows"]
                    if (list["total"] == 0) {
                        var parpam = {
                            title: "提示",
                            subTitle: "暂无查询信息",
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
                        this.heardershow = false
                        if (this.myInput == this.gendrslist[0].sampleNo) {
                            //千阳编号
                            this.liststate = 1
                        } else {
                            this.liststate = 2
                        }
                    }
                })
            } else {
                var parpam = {
                    title: "提示",
                    subTitle: "请输入编号",
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
        } else {
            if (this.myInput && this.liststate == 1) {
                data = {
                    params: `{"sampleNo":${this.myInput}}`
                }
            } else if (this.myInput && this.liststate == 2) {
                data = {
                    params: `{"sampleNum":${this.myInput}}`
                }
            }
            this.Http.post("grain/sample/data", data).subscribe(res => {
                this.promp = true
                // console.log(res.json(),"color:blue")
                this.gendrslist = res.json()["rows"]
            })
        }
    }
    setNavPush(key: any) {
        this.navCtrl.push(detaildPage, {
            "json": key
        })

    }
    setNavPushsample(key: any) {
        this.navCtrl.push(sampleDetailsPage, {
            "json": key
        })
    }
    // 下拉刷新
    doRefresh(refresher) {
        // this.getList()
        setTimeout(() => {
            refresher.complete();
        }, 2000);
    }
    // notice(event){
    //     this.navCtrl.push(noticeViewPage,{
    //         notice:event
    //     })
    // }
    // // 上啦加载
    doInfinite(infiniteScroll) {
        // 扦样
        // this.rows += 10
        // this.getList()
        // infiniteScroll.complete();


    }

}