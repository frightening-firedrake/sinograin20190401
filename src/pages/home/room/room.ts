import { Component } from "@angular/core";
import { NavController } from "ionic-angular"

import { SamplePage } from "./sample/sample"

@Component({
    selector: "room",
    templateUrl: "./room.html"
})

export class roomPage {
    private _sample;
    private _state;
    private _prompt = true;
    private _promptobj = {
        content: "请先选择样品库进行筛选哦！"
    }
    constructor(private navCtrl:NavController) {

    }
    //转到柜室
    sample(){
        this.navCtrl.push(SamplePage,{"_sample":this._sample+'1'})
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
