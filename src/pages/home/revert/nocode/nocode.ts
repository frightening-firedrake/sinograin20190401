import { Component, Input } from "@angular/core";
import { DatePipe } from "@angular/common";
import { HttpService } from '../../../../providers/httpService'
import { NavController, NavParams } from "ionic-angular";
import { _alertBomb } from '../../../common/_alert'


@Component({
    selector: "RevertNocode",
    templateUrl: "nocode.html",
    providers: [DatePipe],
})

export class ReverNocodePage {
    @Input() number = "检验编号";
    data;
    userName;
    sampleNum;
    sapmle={
        number:"",
        storage:"",//位置
        autograph:"",
        storageTime:"",//入库时间
        createTime:"",//领取时间
        receiptor:""

    }
    constructor(
        private datePipe: DatePipe,
        private Http: HttpService,
        private _alert: _alertBomb,
        private params: NavParams
    ) {
        this.data = this.datePipe.transform(new Date(), "MM/dd/yyyy");
        //传过来的值
        this.sampleNum = this.params.get("sampleNum")
    }
    revert() {
        var parpam = {
            title: '归还',
            subTitle: "归还人签名:",
            buttons: [
                {
                    text: '确认',
                    handler: data => {

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
                    name: 'revert',
                    type: "text",
                    placeholder: '请输入归还人签名'
                },
            ]
        }
        var addbuton = {
            text: null
        }
        var addInput = []
        this._alert._alertSmlpe(parpam, addbuton, addInput, data => { })
    }
}
