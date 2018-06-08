import { Component } from '@angular/core';
import { NavController } from 'ionic-angular'
import { _alertBomb } from '../../common/_alert'
import { HttpService } from '../../../providers/httpService'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { libraryPage } from './library/library'

@Component({
    selector: "nocode",
    templateUrl: "./nocode.html"
})

export class NoCode {
    _zhishuku = "请选择直属库";
    _kudian = "请选择库点";
    Companyarr;
    samplylist;
    _huoweihao;
    _number;
    _chandi;
    dataTime;
    nocode;
    librarys;
    _beizhu;
    gendrslist;
    _xinzhi = "请选择性质";
    _pinzhong = "请选择品种";
    addButton = {
        text: "确认"
    }
    constructor(
        private _alert: _alertBomb,
        private Http: HttpService,
        public FormBuilder: FormBuilder,
        private navCtrl: NavController
    ) {
        // 直属库
        let Company = {
            params: `{"pLibraryId": "-1","page":"1","rows":"100"}`
        }
        this.Http.post("grain/library/getAll", Company).subscribe(res => {
            this.samplylist = res.json()
            this.Companyarr = this.samplylist.filter((i, v) => {
                return i.pLibraryId == -1
            })
        })
        this.nocode = this.FormBuilder.group({
            beizhu: ["", Validators.required],
        })
        this._beizhu = this.nocode.controls["beizhu"]
    }
    ionViewDidEnter(){
         //置空
        this._zhishuku = "请选择直属库"
        this._kudian = "请选择库点"
        this._huoweihao = null
        this._pinzhong = "请选择品种"
        this._xinzhi = "请选择性质"
        this._number = null
        this._chandi = null
        this.dataTime = null
        this.nocode.value.beizhu = null
    }
    zhishuku() {
        const parpam = {
            title: "请选择直属库",
        }
        const addInput = []
        this.Companyarr.forEach((v, i) => {

            addInput.push({
                type: 'radio',
                label: v.libraryName,
                value: v.id,
            })
        })
        this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
            this.librarys = this.Companyarr.filter((v, i) => {
                return v.id == data
            })
            this._zhishuku = this.librarys[0].libraryName
        })
    }
    kudian() {
        try {
            this.gendrslist = this.samplylist.filter((v, i) => {
                return v.pLibraryId == this.librarys[0].id
            })
            const parpam = {
                title: "请选择库点",
            }
            const addInput = []
            this.gendrslist.forEach((v, i) => {
                addInput.push({
                    type: 'radio',
                    label: v.libraryName,
                    value: v.id,
                })
            });
            this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
                var kudianname = this.gendrslist.filter((v, i) => {
                    return v.id == data
                })
                this._kudian = kudianname[0].libraryName
            })
        }
        catch (error) {
            var parpam = {
                title: "提示",
                subTitle: "请先选择直属库",
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
    }
    pinzhong() {
        const parpam = {
            title: "请选择品种",
        }
        const addInput = [
            {
                type: 'radio',
                label: '小麦',
                value: '小麦',
            },
            {
                type: 'radio',
                label: '玉米',
                value: '玉米'
            },
        ]
        this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
            this._pinzhong = data
        })
    }
    xinzhi() {
        const parpam = {
            title: "请选择性质",
        }
        const addInput = [
            {
                type: 'radio',
                label: 'ZC',
                value: 'ZC',
            },
            {
                type: 'radio',
                label: 'ZD',
                value: 'ZD'
            },
            {
                type: 'radio',
                label: 'LC',
                value: 'LC',
            },
            {
                type: 'radio',
                label: 'SP',
                value: 'SP'
            },
            {
                type: 'radio',
                label: 'TD',
                value: 'TD',
            },
        ]
        this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
            this._xinzhi = data
        })
    }
    pop(){
        this.navCtrl.pop()
    }
    onSubmit(nocode) {
        this.navCtrl.push(libraryPage, { "testnum": "20180029" })
    }
}