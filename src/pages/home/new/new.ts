import { Component,ViewChild  } from '@angular/core';
import { NavParams,NavController } from 'ionic-angular';
import { _alertBomb } from '../../common/_alert'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
    selector: "new_samp",
    templateUrl: "./new.html"
})

export class newSamp {
    data: any;
    private _strain: any;
    private _place:any;
    private _nature:any;
    myDate:any;
    myyear:any;
    Sampling:FormGroup;
    private addButton:any = {
        text:"确认"
    }
    constructor(public params: NavParams, public _alert: _alertBomb,public navCtrl:NavController, public FormBuilder: FormBuilder) {
        this.data = this.params.get('json');
        this.Sampling = FormBuilder.group({
            myDate:['', [Validators.minLength(4)]],
            myyear:['', [Validators.minLength(4)]]
        })
        this.myDate = this.Sampling.controls["myDate"]
        this.myyear = this.Sampling.controls["myyear"]
    }
    onSubmit(e){
        console.log(e)
    }
    strip(){
      const parpam = {
            title:'提交',
            // message:"提交扦样信息",
            subTitle:"已成功提交扦样信息",
            buttons:[
                {
                    text:"返回",
                    handler:()=>{
                       this.navCtrl.pop()
                    }
                },
                {
                    text:"创建下一条信息",
                    handler:()=>{

                    }
                }
            ],
            cssClass:"succse outsuccse"
        }
        const addInput=[]
        const button = {
            text:0
        }
        this._alert._alertSmlpe(parpam,button,addInput,()=>{
            return 0
        })  
    }
    outstrip(){
        const parpam = {
            // title:'已成功打印条形码并',
            // message:"提交扦样信息",
            subTitle:"已成功打印条形码并提交扦样信息",
            buttons:[
                {
                    text:"返回",
                    handler:()=>{
                       this.navCtrl.pop()
                    }
                },
                {
                    text:"创建下一条信息",
                    handler:()=>{

                    }
                }
            ],
            cssClass:"outsuccse"
        }
        const addInput=[]
        const button = {
            text:0
        }
        this._alert._alertSmlpe(parpam,button,addInput,()=>{
            return 0
        })
    }
    // nature
    // place
    nature(){
        const parpam = {
            title: "选择性质",
        }
        const addInput = [
            {
                type: 'radio',
                label: 'ZC',
                value: 'ZC'
            },
            {
                type: 'radio',
                label: 'ZC',
                value: 'ZC'
            },
            {
                type: 'radio',
                label: 'ZC',
                value: 'ZC'
            },
            {
                type: 'radio',
                label: 'ZC',
                value: 'ZC'
            },
            {
                type: 'radio',
                label: 'ZC',
                value: 'ZC'
            },
            {
                type: 'radio',
                label: 'ZC',
                value: 'ZC'
            }
        ]
        this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
            this._nature = data
        })
    }
    strain() {
        const parpam = {
            title: "选择品牌",
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
