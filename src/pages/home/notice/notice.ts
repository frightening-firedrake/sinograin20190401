import { Component } from "@angular/core";
import { NavController } from 'ionic-angular'
import { HttpService } from '../../../providers/httpService'
import { noticeViewPage } from './notice_view/notice_view'
import { detaildPage } from '../../project/details/details'

@Component({
    selector: "notice",
    templateUrl: "./notice.html"
})

export class noticePage {
    gendrslist;
    myInput;
    // classify:any
    // applye:string = "扦样申请"
    // system:string = "系统通知"
    constructor(public navCtrl: NavController, public Http: HttpService) {
        // this.classify = "applye"
        this.getList()
    }
    getList() {
        var data = {
            params: `{"sampleState":1}`
        }
        this.Http.post("grain/sample/data", data).subscribe(res => {
            console.log(res.json())
            // console.log(res.json(),"color:blue")
            this.gendrslist = res.json()["rows"]
        })
    }
    // 搜索
    secondary() {
        //   console.log(1)
        // let data;
        // if (!this.myInput) {
        //   data = {
        //     params: `{"libraryId":${this.genders},"sampleState":${this._select_smaple},"regState":2}`
        //   }
        // } else {
        var data = {
            params: `{"sampleNo":${this.myInput}}`
        }
        // }
        this.Http.post("grain/sample/data", data).subscribe(res => {
            console.log(res)
            // console.log(res.json(),"color:blue")
            this.gendrslist = res.json()["rows"]
        })
    }
    setNavPush(key: any) {
        this.navCtrl.push(detaildPage, {
            "json": key
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

}