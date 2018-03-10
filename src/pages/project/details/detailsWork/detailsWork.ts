import { Component,enableProdMode } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpService } from '../../../../providers/httpService'
import { _alertBomb } from '../../../common/_alert'
// enableProdMode();
@Component({
    selector: "detailsWork",
    templateUrl: "./detailsWork.html"
})

export class detailsWorkPage {
    private data;
    private detaWork;
    private _slip;
    private _barnType;
    private plibraryName;
    private Work: any = {
        isMatch: '',//账实是否相符

        realCheckedTime: "",//实际查库日

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

        barnType: "",//仓房类型
    };;
    _putWay;
    dateTime;
    _qualityGrade;
    _unQuality;
    sampleId
    Workfrom: any = {
        isMatch: '',//账实是否相符

        realCheckedTime: "",//实际查库日

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

        barnType: "",//仓房类型
    };
    _isfinsh = false
    private addButton: any = {
        text: "确认"
    }
    constructor(
        public parpam: NavParams,
        public FormBuilder: FormBuilder,
        public Http: HttpService,
        public _alert: _alertBomb
    ) {
        this.dateTime = new Date().toISOString();
        console.log(this.parpam.get("params"))
        this.data = this.parpam.get("params")
        // 工作底稿
        this.sampleId = {
            params: `{"sampleId":"${this.data.id}"}`
        }
        this.Http.post("/grain/manuscript/data", this.sampleId).subscribe(res => {
            console.log(res.json())
            let work = res.json()
            // console.log(work["rows"].length)
            if (work["rows"].length) {
                this.Work = work["rows"][0]
                this.callback()
                // this._isfinsh = true
            } else {
            }
        })
        var DateY = new Date().getFullYear()
        var DateM = new Date().getMonth() + 1
        var DateD = new Date().getDate()
        // this.dateTime = `${DateY}-${DateM}-${DateD}`
        this.data.amount = this.data.amount * 1000
        let library = {
            "id": this.data.pLibraryId
        }
        this.Http.post("grain/library/get", library).subscribe(res => {
            console.log(res)
            this.plibraryName = res.json()["libraryName"]
        })
        // console.log(this.data)        
        // :['', [Validators.minLength(4)]]

    }
    callback() {

    }
    // 测量计算数

    unQuality() {
        this._unQuality = Math.round(this.detaWork.value.realVolume * this.detaWork.value.aveDensity)
    }
    // tiji(){
    //     return this.detaWork.value.realVolume * this.detaWork.value.aveDensity
    // }
    ionViewDidEnter() {
        this.detaWork = this.FormBuilder.group({
            isMatch: [this.Work.isMatch, Validators.compose([Validators.required])],
            realCheckedTime: [this.Work.realCheckedTime, Validators.compose([Validators.required])],
            qualityGrade: [this.Work.qualityGrade, Validators.compose([Validators.required])],
            putWay: [this.Work.putWay, Validators.compose([Validators.required])],
            storageCapacity: [this.Work.storageCapacity, Validators.compose([Validators.required])],
            storageWater: [this.Work.storageWater, Validators.compose([Validators.required])],
            storageImpurity: [this.Work.storageImpurity, Validators.compose([Validators.required])],
            realCapacity: [this.Work.realCapacity, Validators.compose([Validators.required])],
            realWater: [this.Work.realWater, Validators.compose([Validators.required])],
            realImpurity: [this.Work.realImpurity, Validators.compose([Validators.required])],
            measuredVolume: [this.Work.measuredVolume, Validators.compose([Validators.required])],
            deductVolume: [this.Work.deductVolume, Validators.compose([Validators.required])],
            realVolume: [this.Work.realVolume, Validators.compose([Validators.required])],
            correctioFactor: [this.Work.correctioFactor, Validators.compose([Validators.required])],
            aveDensity: [this.Work.aveDensity, Validators.compose([Validators.required])],
            length: [this.Work.length, Validators.compose([Validators.required])],
            wide: [this.Work.wide, Validators.compose([Validators.required])],
            high: [this.Work.high, Validators.compose([Validators.required])],
            unQuality: [this.Work.unQuality, Validators.compose([Validators.required])],
            lossWater: [this.Work.lossWater, Validators.compose([Validators.required])],
            lossNature: [this.Work.lossNature, Validators.compose([Validators.required])],
            loss: [this.Work.loss, Validators.compose([Validators.required])],
            checkNum: [this.Work.checkNum, Validators.compose([Validators.required])],
            difference: [this.Work.difference, Validators.compose([Validators.required])],
            slip: [this.Work.slip, Validators.compose([Validators.required])],
            result: [this.Work.result, Validators.compose([Validators.required])],

            barnType: [this.Work.barnType, Validators.compose([Validators.required])],
        })
        // this.Workfrom.myDate = this.detaWork.controls["myDate"]

        this.Workfrom.isMatch = this.detaWork.controls["isMatch"]
        this.Workfrom.realCheckedTime = this.detaWork.controls["realCheckedTime"],
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
            this.Workfrom.barnType = this.detaWork.controls["barnType"]
        for (var obj in this.detaWork.value) {
            this.detaWork.value[obj] = this.Work[obj]
        }
        var datastr = this.dateTime.indexOf("T")
        datastr = this.dateTime.slice(0, datastr)
        this.detaWork.value.realCheckedTime = datastr
        this._isfinsh = true
    }
    onSubmit(e) {
        let data = {
            params: JSON.stringify(e.value)
        }
        this.Http.post("grain/manuscript/saveManMobile", data).subscribe(res => {
            console.log(res)
        })
        console.log(e)
    }
    // onKey(e) {

    //     // console.log(this.detaWork.value.slip>-3&&this.detaWork.value.slip<3)
    //     if (this.detaWork.value.slip > -3 && this.detaWork.value.slip < 3) {
    //         this._slip = "符合"
    //     } else {
    //         this._slip = "不符合"
    //     }
    // }
    mianji(e) {
        var length = this.detaWork.value.length || 1
        var wide = this.detaWork.value.wide || 1
        var high = this.detaWork.value.high || 1

        this.detaWork.value.measuredVolume = (length * wide * high).toFixed(1);
    }
    //粮堆实体体积（m3）
    sttj(e) {
        var deductVolume = this.detaWork.value.deductVolume || 0
        this.detaWork.value.realVolume = (this.detaWork.value.measuredVolume - deductVolume).toFixed(1)
    }
    //容重
    rongzhong(e) {
        this.detaWork.value.realCapacity = this.detaWork.value.realCapacity
    }
    //粮堆平均密度（kg/m）
    ldpjmd(e) {
        var correctioFactor = this.detaWork.value.correctioFactor || 1
        this.detaWork.value.aveDensity = (this.detaWork.value.realCapacity * correctioFactor).toFixed(1)
    }
    // bgzrsh(e) {
    //     var date = new Date();
    //     var newDate = date.getFullYear();
    //     this.detaWork.value.lossNature = this.detaWork.value.grainQuality * 0.002 * (newDate - this.detaWork.value.gainTime)

    // }
    // 账实是否相符
    slip() {
        var that = this
        const parpam = {
            title: "账实是否相符",
        }
        const addInput = [
            {
                type: 'radio',
                label: '是',
                value: '是',
            },
            {
                type: 'radio',
                label: '否',
                value: '否'
            },
        ]
        this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
            that.detaWork.value.isMatch = data
            that.Work.isMatch = data
        })
    }
    // 仓房类型
    barnType() {
        var that = this
        const parpam = {
            title: "仓房类型",
        }
        const addInput = [
            {
                type: 'radio',
                label: '平房仓',
                value: '1'
            },
            {
                type: 'radio',
                label: '高大平房仓',
                value: '2'
            },
            {
                type: 'radio',
                label: '苏式仓',
                value: '3'
            },
            {
                type: 'radio',
                label: '窑洞仓',
                value: '4'
            },
            {
                type: 'radio',
                label: '地下仓',
                value: '5'
            },
        ]
        this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
            that.detaWork.value.barnType = data
            that.Work.barnType = data
        })
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
                label: '一等',
                value: '1'
            },
            {
                type: 'radio',
                label: '二等',
                value: '2'
            },
            {
                type: 'radio',
                label: '三等',
                value: '3'
            },
        ]
        this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
            that.detaWork.value.qualityGrade = data
            that.Work.qualityGrade = data
        })
    }
    // 入库方式
    putWay() {
        var that = this
        const parpam = {
            title: "入仓方式",
        }
        const addInput = [
            {
                type: 'radio',
                label: '人工入仓',
                value: '2 '
            },
            {
                type: 'radio',
                label: '机械入仓 ',
                value: '1 '
            },
        ]
        this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
            that.detaWork.value.putWay = data
            that.Work.putWay = data
            // console.log(data)
            console.log(data)

        })
    }
}