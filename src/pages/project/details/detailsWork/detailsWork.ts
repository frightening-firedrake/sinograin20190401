import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpService } from '../../../../providers/httpService'
import { _alertBomb } from '../../../common/_alert'

@Component({
    selector: "Work",
    templateUrl: "./detailsWork.html"
})

export class detailsWorkPage {
    private data;
    private detaWork;
    private _slip;
    private Workfrom = {
        gainTime: '',//收货年度
        enterprise: "",//被查企业

        checkedTime: "",//被查时点
        realCheckedTime: "",//实际查库日

        grainQuality: "",//保管账数量
        qualityGrade: "",//质量等级,
        putWay: "",//入仓方式
        storageCapacity: "",//入库容重
        storageWater: "",//入库水分
        storageImpurity: "",//入库杂质
        realCapacity: "",//实测容重
        realWater: "",//实测水分
        realImpurity: "",//实测杂质
        measuredVolume: "",//粮堆测量体积
        deductVolume: "",//扣除体积
        realVolume: "",//粮堆实际体积
        correctioFactor: "",//校正后修正系数
        aveDensity: "",//粮堆平均密度
        length: "",//长
        wide: "",//宽
        high: "",//高
        unQuality: "",//测量计算数
        lossWater: "",//水分减量
        lossNature: "",//自然损耗
        loss: "",//合计
        checkNum: "",//检查计算数
        difference: "",//差数
        slip: "",//差率
        result: "",//不符原因
        remark: "",//备注

        barnType: "",//仓房类型

    }
    _putWay;
    _qualityGrade;
     private addButton: any = {
        text: "确认"
    }
    constructor(
        public parpam: NavParams,
        public FormBuilder: FormBuilder,
        public Http:HttpService,
        public _alert :_alertBomb
    ) {
        console.log(this.parpam.get("params"))
        this.data = this.parpam.get("params")
        // console.log(this.data)        
        // :['', [Validators.minLength(4)]]
        this.detaWork = FormBuilder.group({
            gainTime: ['',Validators.compose([Validators.required])],
            enterprise: ['',Validators.compose([Validators.required])],
            checkedTime: ['',Validators.compose([Validators.required])],
            realCheckedTime: ['',Validators.compose([Validators.required])],
            grainQuality: ['',Validators.compose([Validators.required])],
            qualityGrade: ['',Validators.compose([Validators.required])],
            putWay: ['',Validators.compose([Validators.required])],
            storageCapacity: ['',Validators.compose([Validators.required])],
            storageWater: ['',Validators.compose([Validators.required])],
            storageImpurity: ['',Validators.compose([Validators.required])],
            realCapacity: ['',Validators.compose([Validators.required])],
            realWater: ['',Validators.compose([Validators.required])],
            realImpurity: ['',Validators.compose([Validators.required])],
            measuredVolume: ['',Validators.compose([Validators.required])],
            deductVolume: ['',Validators.compose([Validators.required])],
            realVolume: ['',Validators.compose([Validators.required])],
            correctioFactor: ['',Validators.compose([Validators.required])],
            aveDensity: ['',Validators.compose([Validators.required])],
            length: ['',Validators.compose([Validators.required])],
            wide: ['',Validators.compose([Validators.required])],
            high: ['',Validators.compose([Validators.required])],
            unQuality: ['',Validators.compose([Validators.required])],
            lossWater: ['',Validators.compose([Validators.required])],
            lossNature: ['',Validators.compose([Validators.required])],
            loss: ['',Validators.compose([Validators.required])],
            checkNum: ['',Validators.compose([Validators.required])],
            difference: ['',Validators.compose([Validators.required])],
            slip: ['',Validators.compose([Validators.required])],
            result: ['',Validators.compose([Validators.required])],
            remark: ['',Validators.compose([Validators.required])],

            barnType: ['', [Validators.minLength(4)]]
        })
        // this.Workfrom.myDate = this.detaWork.controls["myDate"]

        this.Workfrom.gainTime = this.detaWork.controls["gainTime"],

            this.Workfrom.enterprise = this.detaWork.controls["enterprise"],
            this.Workfrom.checkedTime = this.detaWork.controls["checkedTime"],
            this.Workfrom.realCheckedTime = this.detaWork.controls["realCheckedTime"],

            this.Workfrom.grainQuality = this.detaWork.controls["grainQuality"],
            this.Workfrom.qualityGrade = this.detaWork.controls["qualityGrade"],
            this.Workfrom.putWay = this.detaWork.controls["putWay"],
            this.Workfrom.storageCapacity = this.detaWork.controls["storageCapacity"],
            this.Workfrom.storageWater = this.detaWork.controls["storageWater"],
            this.Workfrom.storageImpurity = this.detaWork.controls["storageImpurity"],
            this.Workfrom.realCapacity = this.detaWork.controls["realCapacity"],
            this.Workfrom.realWater = this.detaWork.controls["realWater"],
            this.Workfrom.realImpurity = this.detaWork.controls["realImpurity"],
            this.Workfrom.measuredVolume = this.detaWork.controls["measuredVolume"],
            this.Workfrom.deductVolume = this.detaWork.controls["deductVolume"],
            this.Workfrom.realVolume = this.detaWork.controls["realVolume"],
            this.Workfrom.correctioFactor = this.detaWork.controls["correctioFactor"],
            this.Workfrom.aveDensity = this.detaWork.controls["aveDensity"],
            this.Workfrom.length = this.detaWork.controls["length"],
            this.Workfrom.wide = this.detaWork.controls["wide"],
            this.Workfrom.high = this.detaWork.controls["high"],
            this.Workfrom.unQuality = this.detaWork.controls["unQuality"],
            this.Workfrom.lossWater = this.detaWork.controls["lossWater"],
            this.Workfrom.lossNature = this.detaWork.controls["lossNature"],
            this.Workfrom.loss = this.detaWork.controls["loss"],
            this.Workfrom.checkNum = this.detaWork.controls["checkNum"],
            this.Workfrom.difference = this.detaWork.controls["difference"],
            this.Workfrom.slip = this.detaWork.controls["slip"],
            this.Workfrom.result = this.detaWork.controls["result"],
            this.Workfrom.remark = this.detaWork.controls["remark"],
            this.Workfrom.barnType = this.detaWork.controls["barnType"]
    }
    onSubmit(e) {
        let data = {
            params:JSON.stringify(e.value)
        }
        this.Http.post("grain/manuscript/saveMan",data).subscribe(res=>{
            console.log(res)
        })
        console.log(e)
    }
    onKey(e){
        
        // console.log(this.detaWork.value.slip>-3&&this.detaWork.value.slip<3)
        if(this.detaWork.value.slip>-3&&this.detaWork.value.slip<3){
           this._slip = "符合"
        }else{
            this._slip = "不符合"
        }
    }
    mianji(e) { 
        var length = this.detaWork.value.length || 1
        var wide = this.detaWork.value.wide || 1
        var high = this.detaWork.value.high || 1
        this.detaWork.value.measuredVolume  = length*wide*high
    }
    //粮堆实体体积（m3）
    sttj(e) {
        var deductVolume = this.detaWork.value.deductVolume || 0
        this.detaWork.value.realVolume = this.detaWork.value.measuredVolume - deductVolume
    }
    //容重
    rongzhong(e) {
        this.detaWork.value.realCapacity = this.detaWork.value.realCapacity
    }
    //粮堆平均密度（kg/m）
    ldpjmd(e) {
        var correctioFactor = this.detaWork.value.correctioFactor || 1
        this.detaWork.value.aveDensity = this.detaWork.value.realCapacity * correctioFactor
    }
    bgzrsh(e) {
        var date = new Date();
        var newDate = date.getFullYear();
        this.detaWork.value.lossNature = this.detaWork.value.grainQuality * 0.002 * (newDate - this.detaWork.value.gainTime)
    
    }
    // 质量的弹框
    qualityGrade() {
        var that = this
        const parpam = {
            title: "选择质量",
        }
        const addInput = [
            {
                type: 'radio',
                label: '上等',
                value: '上等'
            },
            {
                type: 'radio',
                label: '中等',
                value: '中等'
            },
            {
                type: 'radio',
                label: '下等',
                value: '下等'
            },
        ]
        this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
            that.detaWork.value.qualityGrade = data
            that._qualityGrade = data
        })
    }
    // 入库方式
    putWay(){
       var that = this
        const parpam = {
            title: "选择质量",
        }
        const addInput = [
            {
                type: 'radio',
                label: '人工入仓',
                value: '人工入仓 '
            },
            {
                type: 'radio',
                label: '机械入仓 ',
                value: '机械入仓 '
            },
        ]
        this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
            that.detaWork.value.putWay = data
            // console.log(data)
             that._putWay = data
        }) 
    }
}