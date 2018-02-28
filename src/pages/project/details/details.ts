import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { _alertBomb } from '../../common/_alert'
import { HttpService } from '../../../providers/httpService'

@Component({
    selector: "derails",
    templateUrl: "./details.html"
})

export class detaildPage {
    classify: any
    sample: any
    dateStr: string
    data: any;
    Work:any;
    Safe:any;
    constructor(
        public params: NavParams,
        public _alert: _alertBomb,
        public Http: HttpService
    ) {
        this.classify = "new"
        this.sample = this.params.get('json')
        console.log(this.sample)
        //工作底稿的数据
        let sampleId ={
            params:`{"sampleId":"${this.sample.id}"}`
        }
        this.Http.post("/grain/manuscript/data",sampleId).subscribe(res=>{
            console.log(res.json())
            let work = res.json()
            this.Work = work["rows"][0]
        })
        // 安全报告的数据
        this.Http.post("/grain/safetyReport/data",sampleId).subscribe(res=>{
            console.log(res.json())
            let safe = res.json()
            this.Safe = safe["rows"]
        })
        // safetyReport/data
    }
    // 扦样信息中的打印条形码的功能
    _sample() {
        let parpam = {
            title: "是否确认扦样",
            subTitle: "此操作不可逆，请谨慎选择",
            buttons: [
                {
                    text: '取消',
                    // role: 'destructive',
                    handler: () => {

                    }
                },
                {
                    text: '确认',
                    //   role: 'destructive',
                    handler: () => {
                        let parpam = {
                            id: this.sample.id,
                            sampleState: 1
                        }
                        this.Http.post("/grain/sample/edit", parpam).subscribe(res => {
                            this.data = res.json()
                            if (this.data.success) {
                                let params = {
                                    title: "",
                                    subTitle:"扦样成功",
                                    buttons: [
                                        {
                                            text: "确认",
                                            handler: () => {

                                            }
                                        }
                                    ],
                                    cssClass: "outsuccse only"
                                }
                                let addbuton = {
                                    text: null
                                }
                                let addInput = []
                                this._alert._alertSmlpe(params, addbuton, addInput, data => {
                                    console.log(data)
                                })
                                this.sample.sampleState = 1
                            }
                        })
                    }
                }
            ],
            cssClass: "outsuccse succse"
        }
        let addbuton = {
            text: null
        }
        let addInput = []
        this._alert._alertSmlpe(parpam, addbuton, addInput, data => {
            return 0
        })
    }

}