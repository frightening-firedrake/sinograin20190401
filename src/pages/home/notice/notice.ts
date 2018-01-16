import { Component } from "@angular/core";
import { NavController } from 'ionic-angular'

import { noticeViewPage } from './notice_view/notice_view'

@Component({
    selector:"notice",
    templateUrl:"./notice.html"
})

export class noticePage{
    classify:any
    applye:string = "扦样申请"
    system:string = "系统通知"
    constructor(public navCtrl: NavController){
        this.classify = "applye"
    }
    notice(event){
        this.navCtrl.push(noticeViewPage,{
            notice:event
        })
    }
}