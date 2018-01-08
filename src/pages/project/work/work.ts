import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { _alertBomb } from '../../common/_alert'
import { workViewPage } from './work_view/work_view'


@Component({
    selector: "work",
    templateUrl: "./work.html"
})

export class workPage {
    data: any;
    private _strain = "无"; 
    private _type = "无";
    private Work :FormGroup;
    cang:any;
     myDate:any;
    private addButton:any = {
        text:"确认"
    }
    constructor(public params: NavParams, public navCtrl: NavController, public _alert: _alertBomb, public FormBuilder: FormBuilder) {
        this.data = this.params.get("json")
        this.Work = FormBuilder.group({
            cang:['', [Validators.minLength(4)]],
              myDate:['', [Validators.minLength(4)]],
        })
        this.cang = this.Work.controls["cang"]
                this.myDate = this.Work.controls["myDate"]

    }
    goshow() {
        this.navCtrl.push(workViewPage)
    }
    strain() {
        const parpam = {
            title: "选择品种",
        }
        const addInput = [
            {
                type: 'radio',
                label: '小麦',
                value: '小麦'
            },
            {
                type: 'radio',
                label: '玉米',
                value: '玉米'
            },
            {
                type: 'radio',
                label: '小麦',
                value: '小麦'
            },
            {
                type: 'radio',
                label: '玉米',
                value: '玉米'
            },
            {
                type: 'radio',
                label: '小麦',
                value: '小麦'
            },
            {
                type: 'radio',
                label: '玉米',
                value: '玉米'
            }
        ]
        this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
            this._strain = data
        })
    }
    type(){
       const parpam = {
            title: "选择仓房类型",
        }
        const addInput = [
            {
                type: 'radio',
                label: '小麦',
                value: '小麦'
            },
            {
                type: 'radio',
                label: '玉米',
                value: '玉米'
            },
            {
                type: 'radio',
                label: '小麦',
                value: '小麦'
            },
            {
                type: 'radio',
                label: '玉米',
                value: '玉米'
            },
            {
                type: 'radio',
                label: '小麦',
                value: '小麦'
            },
            {
                type: 'radio',
                label: '玉米',
                value: '玉米'
            }
        ]
        this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
            this._strain = data
        }) 
    }
}