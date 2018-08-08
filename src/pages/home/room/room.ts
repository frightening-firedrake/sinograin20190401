import { Component } from "@angular/core";
import { NavController } from "ionic-angular"
import { HttpService } from '../../../providers/httpService'

import { SamplePage } from "./sample/sample"

@Component({
    selector: "room",
    templateUrl: "./room.html"
})

export class roomPage {
    private _sample;
    private _state;
    private _select;
    private _Counter;
    private _Counterlist;
    private _prompt = false;
    private _promptobj = {
        content: "请先选择样品室进行筛选哦！"
    }
    constructor(
        private navCtrl: NavController,
        private Http: HttpService
    ) {
        // console.log(this.navCtrl.canGoBack())
    }
    ionViewDidEnter() {
        this.Http.post("grain/warehouse/getAll").subscribe(res => {
            this._sample = res.json()
        })
        this._prompt = false;
        this._select = null
    }
    //转到柜室
    sample(Counter) {
        this.navCtrl.push(SamplePage, { "_sample": "样品" + this._select+ "室-" + Counter.counter, "Counter": Counter.id })
    }
    // 下拉刷新
    doRefresh(refresher) {
        this.selectSample()
        // this.secondary()
        setTimeout(() => {
            refresher.complete();
        }, 2000);
    }
    selectSample() {
        // console.log(this._select)
        let params = {
            pId: this._select
        }
        this.Http.post("grain/warehouseCounter/data", { params: JSON.stringify(params) }).subscribe(res => {
            this._Counter = res.json()["rows"]
            this._Counterlist = this._Counter
            console.log(this._Counterlist)
            this._Counterlist.sort((a, b)=>{
                return a.id - b.id
            })
            this._prompt = true
            this._state = null
        })
    }
    selectState() {
        switch (this._state) {
            case "1":
                this._Counterlist = this._Counter
                break;
            case "2":
                this._Counterlist = this._Counter.filter(v => {
                    return v.warehouseUseNumber > 36
                })
                break
            case "3":
                this._Counterlist = this._Counter.filter(v => {
                    return v.warehouseUseNumber >= 14 && v.warehouseUseNumber < 36
                })
                break;
            case "4":
                this._Counterlist = this._Counter.filter(v => {
                    return v.warehouseUseNumber < 14
                })
                break;
        }
    }
}
