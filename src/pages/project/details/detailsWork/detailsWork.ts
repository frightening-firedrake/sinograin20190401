import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HttpService } from '../../../../providers/httpService'
import { _alertBomb } from '../../../common/_alert'
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
    shape = "work"
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
        remark: "",
        barnType: "",//仓房类型
        topS: "",//上底面积
        bottomS: "",//下底面积
        diameter: "",//直径
        length_2: "",//长度2
        high_2: "",//宽度2
    };
    _putWay;
    dateTime;
    _qualityGrade;
    _unQuality;
    sampleId;
    _amount;
    title;
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
        checkNum: "",//检查计算数检查计算数
        difference: "",//差数
        slip: "",//差率
        result: "",//不符原因
        remark: "",
        barnType: "",//仓房类型
        topS: "",//上底面积
        bottomS: "",//下底面积
        diameter: "",//直径
        length_2: "",//长度2
        high_2: "",//宽度2
    };
    isresult = true;
    _isfinsh = false
    private addButton: any = {
        text: ""
    }
// 2.粮堆实际体积＝粮堆测量体积－需要扣除体积。                                                         
// realVolume=measuredVolume-deductVolume
// 3.粮堆平均密度＝粮食容重(单位体积粮食重量)×校正后修正系数。                                                                
// aveDensity=realCapacity*correctioFactor
// 4.测量计算数＝粮堆实际体积×粮堆平均密度。                                                          
// unQuality=realVolume*aveDensity
// 5.水分减量＝保管账数量×(入库水分%－实测水分%)/(1－实测水分%)。                                                           
// lossWater=_amount*（storageWater-realWater）/(1-storageWater)
// 6.保管自然损耗＝保管账数量×0.2%×粮食储存年数。                                                             
// lossNature=_amount*0.2%*(new data()-data.gainTime)
// 7.合计=水分减量＋保管自然损耗。                                                           
// loss=lossWater+lossNature
// 8.检查计算数＝测量计算数＋应记粮食损耗。                                                           
// checkNum=unQuality+loss
// 9.差数＝保管账数量－检查计算数；
// difference=_amount-checkNum
// 10.差率＝差数/保管账数量×100％。
// slip=difference/_amount*100%

    constructor(
        public parpam: NavParams,
        public FormBuilder: FormBuilder,
        public Http: HttpService,
        public _alert: _alertBomb,
        public navctrl: NavController,
    ) {
        this.dateTime = new Date().toISOString();
        this.data = this.parpam.get("params")
        this._amount = this.data.amount * 1000
        let library = {
            "id": this.data.pLibraryId
        }
        this.detaWork = this.FormBuilder.group({
            isMatch: ["是", Validators.compose([Validators.required])],
            realCheckedTime: [, Validators.compose([Validators.required])],
            qualityGrade: [, Validators.compose([Validators.required])],
            putWay: [" ", Validators.compose([Validators.required])],
            storageCapacity: ["", Validators.compose([Validators.required])],
            storageWater: [, Validators.compose([Validators.required])],
            storageImpurity: [, Validators.compose([Validators.required])],
            realCapacity: [, Validators.compose([Validators.required])],
            realWater: [, Validators.compose([Validators.required])],
            realImpurity: [, Validators.compose([Validators.required])],
            measuredVolume: [, Validators.compose([Validators.required])],
            deductVolume: [, Validators.compose([Validators.required])],
            realVolume: [, Validators.compose([Validators.required])],
            correctioFactor: [, Validators.compose([Validators.required])],
            aveDensity: [, Validators.compose([Validators.required])],
            length: [, Validators.compose([Validators.required])],
            wide: [, Validators.compose([Validators.required])],
            high: [, Validators.compose([Validators.required])],
            unQuality: [, Validators.compose([Validators.required])],
            lossWater: [, Validators.compose([Validators.required])],
            lossNature: [, Validators.compose([Validators.required])],
            loss: [, Validators.compose([Validators.required])],
            checkNum: [, Validators.compose([Validators.required])],
            difference: [, Validators.compose([Validators.required])],
            slip: [, Validators.compose([Validators.required])],
            result: ["无", Validators.compose([Validators.required])],
            remark: [, Validators.compose([Validators.required])],
            barnType: [" ", Validators.compose([Validators.required])],
            topS: ['',],//上底面积长方截椎体
            bottomS: ['',],//下底面积长方截椎体
            diameter: ['',],//直径 圆柱体
            length_2: ['',],//长度2 其他
            high_2: ['',],//高2 其他
        })
        // this.Workfrom.myDate = this.detaWork.controls["myDate"]
        this.Workfrom.topS = this.detaWork.controls["topS"]
        this.Workfrom.bottomS = this.detaWork.controls["bottomS"]
        this.Workfrom.diameter = this.detaWork.controls["diameter"]
        this.Workfrom.length_2 = this.detaWork.controls["length_2"]
        this.Workfrom.high_2 = this.detaWork.controls["high_2"]
        this.Workfrom.remark = this.detaWork.controls["remark"]
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
        this.Http.post("grain/library/get", library).subscribe(res => {
            this.plibraryName = res.json()["libraryName"]
        })

        // console.log(this.data)        
        // :['', [Validators.minLength(4)]]

    }
    shuifen(font) {
        this.Work[font] = (this.detaWork.value[font] * 1).toFixed(1)
        this.lossWater()
        //    this.Work.storageWater = this.Work.storageWater.toFixed(1)
    }
    ionViewDidEnter() {
        // 工作底稿
        this.sampleId = {
            params: `{"sampleId":"${this.data.id}"}`
        }

        this.Http.post("/grain/manuscript/data", this.sampleId).subscribe(res => {
            let work = res.json()
            console.log(work)
            // console.log(work["rows"].length)
            if (work["rows"].length) {
                this.title = "修改工作底稿"
                // console.log(this.title)
                this.Work = work["rows"][0]
                switch(this.Work.shape){
                    case "长方体":
                        this.shape = "work"
                        break;
                    case "圆柱体":
                        this.shape = "yuanzhu"
                        break;
                    case "其他":
                        this.shape = "qita"
                        break;
                    case "长方截锥体":
                        this.shape = "changfangjiezhuiti"
                        break;
                }

            } else {
                this.title = "创建工作底稿"
                let _amoutn = Number(this._amount) , realCheckedTime =Number( this.detaWork.value.realCheckedTime.split("-")[0]) , gainTime =Number( this.data.gainTime )
                this.Work.lossNature = _amoutn * (0.2 / 100) * (realCheckedTime - gainTime)
                console.log(this.Work.lossNature)

            }
        })

        for (var obj in this.detaWork.value) {
            this.detaWork.value[obj] = this.Work[obj]
        }
        this._isfinsh = true
    }
    onSubmit(e) {
        e.value.sampleId = this.data.id
        let url
        switch (this.shape) {
            case "work":
                e.value.shape = "长方体"
                url = "/manuscript/exportExcelCFT"
                break;
            case "yuanzhu":
                e.value.shape = "圆柱体"
                url = "/manuscript/exportExcelYZT"
                break;
            case "changfangjiezhuiti":
                e.value.shape = "长方截锥体"
                url = "/manuscript/exportExcelCFJZT"
                break;
            case "qita":
                e.value.shape = "其他"
                url = "/manuscript/exportExcelQT"
                break;
        }
        let data = {
            params: JSON.stringify(e.value),
            type: 1
        }
        this.Http.post("grain/manuscript/saveOrEditMobile", data).subscribe(res => {
            this.navctrl.pop()
        })
    }
    //校正后修正系数保留
    correctioFactor() {
       this.Work.correctioFactor = (this.detaWork.value.correctioFactor*1).toFixed(2) 
    }
    //return 粮堆测量体积
    setmeasuredVolume() {
        let count
        let h = this.detaWork.value.high
        switch (this.shape) {
            case "work":
                var length = this.detaWork.value.length
                var wide = this.detaWork.value.wide
                count = (length * wide * h)
                break;
            case "yuanzhu":
                let s = 3.14 * Math.pow(this.detaWork.value.diameter * 1, 2) / 4
                count = (h * s)
                break;
            case "changfangjiezhuiti":
                let s1 = this.detaWork.value.topS
                let s2 = this.detaWork.value.bottomS
                count = ((s1 + s2 + Math.sqrt(s1 * s2)) * h / 3)
                break;
            case "qita":
                let gao2 = this.detaWork.value.high_2
                let chang2 = this.detaWork.value.length_2
                var length = this.detaWork.value.length
                var wide = this.detaWork.value.wide
                count = (h * length * wide + (h + gao2) * chang2 / 2)
                break;
        }
        this.Work.measuredVolume = count.toFixed(1)
        // this.sttj()
        this.setrealVolume()
    }
    // return 粮堆实际体积
    setrealVolume() {
        let measuredVolume = Number(this.detaWork.value.measuredVolume), deductVolume = Number(this.detaWork.value.deductVolume)
        this.Work.realVolume = measuredVolume - deductVolume
        this.setaveDensity()
    }
    //return 粮堆平均密度
    setaveDensity() {
        //粮食容重=实际容重
        let realCapacity = Number(this.detaWork.value.realCapacity), correctioFactor = Number(this.detaWork.value.correctioFactor)
        this.Work.aveDensity = (realCapacity * correctioFactor).toFixed(1)
        this.unQuality()
    }
    // return 测量计算数
    unQuality() {
        console.log(this.Work.realVolume,this.detaWork.value.aveDensity,this.Work.aveDensity)
        let realVolume = Number(this.detaWork.value.realVolume), aveDensity = Number(this.Work.aveDensity)//因为this.detaWork.value.aveDensity是上一个值
        console.log(realVolume,aveDensity)
        this.Work.unQuality = Math.round(realVolume * aveDensity)
        
        this.checkNum()
    }
    // return 水分减量
    lossWater() {
        let storageWater = Number(this.detaWork.value.storageWater) / 100, relaWater = Number(this.detaWork.value.realWater) / 100
        this.Work.lossWater = Math.round(this._amount * (storageWater - relaWater) / (1 - storageWater))
        console.log(storageWater, relaWater, this._amount * (storageWater - relaWater), (1 - storageWater))
        this.loss()
    }
    // return 合计
    loss() {
        let lossWater = Number(this.detaWork.value.lossWater), lossNature = Number(this.detaWork.value.lossNature)
        this.Work.loss = lossWater + lossNature
        // console.log(lossWater,lossNature)
        this.checkNum()
    }
    // return 检查计算数
    checkNum() {
        let unQuality = Number(this.detaWork.value.unQuality), loss = Number(this.detaWork.value.loss)
        this.Work.checkNum = Math.round(unQuality + loss)
        // console.log(unQuality,loss)
        this.difference()
    }
    // return 差数
    difference() {
        let _amount = Number(this._amount), checkNum = Number(this.Work.checkNum)
        this.Work.difference = Math.round(_amount - checkNum)
        this.slip()
    }
    // return 差率
    slip() {
        let difference = Number(this.detaWork.value.difference), _amount = Number(this._amount)
        this.Work.slip = (difference / _amount * 1).toFixed(1)
    }
    // // 差数
    // difference() {
    //     var correctioFactor = this.detaWork.value.correctioFactor || 1
    //     var deductVolume = this.detaWork.value.deductVolume || 0
    //     var length = this.detaWork.value.length || 1
    //     var wide = this.detaWork.value.wide || 1
    //     var high = this.detaWork.value.high || 1
    //     this.Work.difference = (this._amount) - this.detaWork.value.checkNum
    //     // this.Work.difference = Math.round(this.data.amount * 1000 - (((length * wide * high) - deductVolume) * (this.detaWork.value.realCapacity * correctioFactor) * 1 + (this.detaWork.value.lossWater * 1 + this.detaWork.value.lossNature * 1)))
    //     this.slip()
    // }
    // //差率
    // slip() {
    //     var correctioFactor = this.detaWork.value.correctioFactor || 1
    //     var deductVolume = this.detaWork.value.deductVolume || 0
    //     var length = this.detaWork.value.length || 1
    //     var wide = this.detaWork.value.wide || 1
    //     var high = this.detaWork.value.high || 1
    //     this.Work.slip = ((this.data.amount * 1000 - (((length * wide * high) - deductVolume) * (this.detaWork.value.realCapacity * correctioFactor) * 1 + (this.detaWork.value.lossWater * 1 + this.detaWork.value.lossNature * 1))) / (this.data.amount * 1000) * 100).toFixed(1)
    // }
    // // 合计
    // loss() {
    //     this.Work.loss = this.detaWork.value.lossWater * 1 + this.detaWork.value.lossNature * 1
    //     var correctioFactor = this.detaWork.value.correctioFactor || 1
    //     var deductVolume = this.detaWork.value.deductVolume || 0
    //     var length = this.detaWork.value.length || 1
    //     var wide = this.detaWork.value.wide || 1
    //     var high = this.detaWork.value.high || 1
    //     // this.Work.checkNum = Math.round(((length * wide * high) - deductVolume) * (this.detaWork.value.realCapacity * correctioFactor) * 1 + (this.detaWork.value.lossWater * 1 + this.detaWork.value.lossNature * 1))
    //     this.Work.checkNum = this.detaWork.value.unQuality + Number(this.detaWork.value.lossWater) + Number(this.detaWork.value.lossNature)
    //     console.log(this.detaWork.value.unQuality , Number(this.detaWork.value.lossWater) , Number(this.detaWork.value.lossNature))
    //     this.difference()
    // }
    // // 测量计算数
    // unQuality() {
    //     var correctioFactor = this.detaWork.value.correctioFactor || 1
    //     var deductVolume = this.detaWork.value.deductVolume || 0
    //     var length = this.detaWork.value.length || 1
    //     var wide = this.detaWork.value.wide || 1
    //     var high = this.detaWork.value.high || 1
    //     this.Work.unQuality = Math.round(this.Work.realVolume * this.Work.aveDensity)
    //     // this.Work.unQuality = Math.round(((length * wide * high) - deductVolume) * (this.detaWork.value.realCapacity * correctioFactor))
    //     this.loss()
    // }

    // //粮堆实体体积（m3）
    // sttj() {
    //     var deductVolume = this.detaWork.value.deductVolume || 0
    //     this.Work.realVolume = (this.Work.measuredVolume - deductVolume).toFixed(1)
    //     this.Work.checkNum = Math.round(this.detaWork.value.unQuality * 1 + this.detaWork.value.loss * 1)
    //     this.unQuality()


    // }
    // 粮食容重
    // realCapacity() {
    //     this.Work.realCapacity = this.detaWork.value.realCapacity
    // }
    // //容重
    // rongzhong(e) {
    //     this.detaWork.value.realCapacity = this.detaWork.value.realCapacity
    // }
    //粮堆平均密度（kg/m）
    // ldpjmd() {
    //     var correctioFactor = this.detaWork.value.correctioFactor || 1
    //     this.Work.aveDensity = (this.detaWork.value.realCapacity * correctioFactor).toFixed(1)
    //     this.loss()
    // }
    // 账实是否相符
    isMatch() {
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
            that.detaWork.value.isMatch = data.value
            that.Work.isMatch = data.value
            if (data.value == "是") {
                this.isresult = true
                this.Work.result = "无"
            } else {
                this.isresult = false
            }
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
                value: '平房仓'
            },
            {
                type: 'radio',
                label: '高大平房仓',
                value: '高大平房仓'
            },
            {
                type: 'radio',
                label: '苏式仓',
                value: '苏式仓'
            },
            {
                type: 'radio',
                label: '窑洞仓',
                value: '窑洞仓'
            },
            {
                type: 'radio',
                label: '地下仓',
                value: '地下仓'
            },
        ]
        this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
            that.detaWork.value.barnType = data.value
            that.Work.barnType = data.value
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
            that.detaWork.value.qualityGrade = data.value
            that.Work.qualityGrade = data.value
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
            that.detaWork.value.putWay = data.value
            that.Work.putWay = data.value

        })
    }
    //粮堆形状选择
    selectshape() {

        const parpam = {
            title: "请选择粮堆形状",
        }
        const addInput = [
            {
                type: 'radio',
                label: '长方体',
                value: 'work'
            },
            {
                type: 'radio',
                label: '圆柱体 ',
                value: 'yuanzhu'
            },
            {
                type: 'radio',
                label: '长方截锥体 ',
                value: 'changfangjiezhuiti'
            },
            {
                type: 'radio',
                label: '其他 ',
                value: 'qita'
            },
        ]
        this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
            // that.Worknew.value.putWay = data
            this.shape = data.value
        })
    }
}