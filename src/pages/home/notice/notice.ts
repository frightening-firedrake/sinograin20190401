import { Component } from "@angular/core";
import { NavController } from 'ionic-angular'
import { HttpService } from '../../../providers/httpService'
import { noticeViewPage } from './notice_view/notice_view'
import { detaildPage } from '../../project/details/details'
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { sampleDetailsPage } from "./sampledetails/sampledetails"

@Component({
    selector: "notice",
    templateUrl: "./notice.html"
})

export class noticePage {
    gendrslist;
    myInput;
    rows = 11
    totle;
    // classify:any
    // applye:string = "扦样申请"
    // system:string = "系统通知"
    constructor(
        public navCtrl: NavController,
        public Http: HttpService,
        public barcode: BarcodeScanner
    ) {
        // this.classify = "applye"
        this.getList()
    }
    getList() {
        var data = {
            params: `{"sampleState":1}`,
            rows: this.rows,
            page: "1"
        }
        this.Http.post("grain/sample/data", data).subscribe(res => {
            console.log(res.json())
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
            console.log('Error', err);
        });
    }
    // 搜索
    secondary() {
        var data
        //   console.log(1)
        // let data;
        // if (!this.myInput) {
        //   data = {
        //     params: `{"libraryId":${this.genders},"sampleState":${this._select_smaple} ,"regState":2}`
        //   }
        // } else {
        if (this.myInput) {
            data = {
                params: `{"sampleNo":${this.myInput}}`
            }
        } else {
            data = {}
        }
        // }
        this.Http.post("grain/sample/data", data).subscribe(res => {
            console.log(res)
            // console.log(res.json(),"color:blue")
            this.gendrslist = res.json()["rows"]
        })
    }
    setNavPush(key: any) {
        // this.navCtrl.push(detaildPage, {
        //     "json": key
        // })
        this.navCtrl.push(sampleDetailsPage,{
            "json":key
        })
    }
    // 下拉刷新
    doRefresh(refresher) {
        this.getList()
        console.log(refresher)
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
        this.rows += 10
        this.getList()
        infiniteScroll.complete();


    }

}