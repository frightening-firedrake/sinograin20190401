import { Component } from "@angular/core"
import { NavParams } from 'ionic-angular'

@Component({
    selector:"notice_view",
    templateUrl:"./notice_view.html"
})

export class noticeViewPage{
    notice:any;
    constructor(public params: NavParams){
        this.notice = params.get("notice")
    }
}