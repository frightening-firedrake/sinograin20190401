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
    constructor(
        public params: NavParams,
        public _alert: _alertBomb,
        public Http: HttpService
    ) {
        this.classify = "new"
        this.sample = this.params.get('json')
    }
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