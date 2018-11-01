import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { NativeService } from '../../../providers/nativeService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { _alertBomb } from '../../common/_alert'
import { HttpService } from '../../../providers/httpService'
import { detailsWorkPage } from './detailsWork/detailsWork'
import { detaSafePage } from './detailsSafe/detailsSafe'
import { APP_SERVE_URL } from "../../../providers/config";
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { StorageService } from '../../../providers/locationstorageService'
import { BleServer } from '../../../providers/ble'


@Component({
    selector: "derails",
    templateUrl: "./details.html"
})

export class detaildPage {
    private detaWork;
    private _isMatch;
    Worknew;
    dateTime;
    isrequire
    isresult = true
    //粮堆形状
    shape = "work"
    private Workfrom = {
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
        barnType: "",//仓房类型,
        remark: "",//备注
        topS: "",//上底面积
        bottomS: "",//下底面积
        diameter: "",//直径
        length_2: "",//长度2
        high_2: "",//宽度2
    }
    private addButton: any = {
        text: ""
    }
    classify: any
    Safe_img = [];
    sample: any
    dateStr: string
    data: any;
    Work: any;
    Work_flag = true;
    ble_falg = true
    Safe: any;
    devices: any;
    device: any;
    problem;
    characteristics: any;
    serviceUUID: any;
    characteristicUUID: any;
    deviceId: any;
    buffered;
    plibraryName;
    Safe_flag = true;
    sampleId;
    _unsolved
    _solve
    _unsolvedimg = []
    _solveimg = []
    _amount;
    index = 1
    code;
    _barnTime
    _storage
    private pringarr = ["8C:DE:52:FA:A6:19"]
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
        public params: NavParams,
        public _alert: _alertBomb,
        public Http: HttpService,
        public FormBuilder: FormBuilder,
        public BLE: BLE,
        public navCtrl: NavController,
        private nativeService: NativeService,
        private photoViewer: PhotoViewer,
        public Storage: StorageService,
        public ble: BleServer
    ) {
        this.dateTime = new Date().toISOString();
        this.Worknew = FormBuilder.group({
            remark: ['', Validators.compose([Validators.required])],
            isMatch: ['是', Validators.compose([Validators.required])],
            realCheckedTime: ['', Validators.compose([Validators.required])],
            qualityGrade: ['', Validators.compose([Validators.required])],
            putWay: ['', Validators.compose([Validators.required])],
            storageCapacity: ['', Validators.compose([Validators.required])],
            storageWater: ['', Validators.compose([Validators.required])],
            storageImpurity: ['', Validators.compose([Validators.required])],
            realCapacity: ['', Validators.compose([Validators.required])],
            realWater: ['', Validators.compose([Validators.required])],
            realImpurity: ['', Validators.compose([Validators.required])],
            measuredVolume: ['', Validators.compose([Validators.required])],
            deductVolume: ['', Validators.compose([Validators.required])],
            realVolume: ['', Validators.compose([Validators.required])],
            correctioFactor: ['', Validators.compose([Validators.required])],
            aveDensity: ['', Validators.compose([Validators.required])],
            length: ['',],//长
            wide: ['',],//宽
            high: ['',],//高
            topS: ['',],//上底面积长方截椎体
            bottomS: ['',],//下底面积长方截椎体
            diameter: ['',],//直径 圆柱体
            length_2: ['',],//长度2 其他
            high_2: ['',],//高2 其他
            unQuality: ['', Validators.compose([Validators.required])],
            lossWater: ['0', Validators.compose([Validators.required])],
            lossNature: ['0', Validators.compose([Validators.required])],
            loss: [, Validators.compose([Validators.required])],
            checkNum: ['', Validators.compose([Validators.required])],
            difference: ['', Validators.compose([Validators.required])],
            slip: ['', Validators.compose([Validators.required])],
            result: ['', Validators.compose([Validators.required])],

            barnType: ['', Validators.compose([Validators.required])],
        })
        this.Workfrom.topS = this.Worknew.controls["topS"]
        this.Workfrom.bottomS = this.Worknew.controls["bottomS"]
        this.Workfrom.diameter = this.Worknew.controls["diameter"]
        this.Workfrom.length_2 = this.Worknew.controls["length_2"]
        this.Workfrom.high_2 = this.Worknew.controls["high_2"]
        this.Workfrom.remark = this.Worknew.controls["remark"]
        this.Workfrom.isMatch = this.Worknew.controls["isMatch"]
        this.Workfrom.realCheckedTime = this.Worknew.controls["realCheckedTime"],
            this.Workfrom.qualityGrade = this.Worknew.controls["qualityGrade"],
            this.Workfrom.putWay = this.Worknew.controls["putWay"],
            this.Workfrom.storageCapacity = this.Worknew.controls["storageCapacity"],
            this.Workfrom.storageWater = this.Worknew.controls["storageWater"],
            this.Workfrom.storageImpurity = this.Worknew.controls["storageImpurity"],
            this.Workfrom.realCapacity = this.Worknew.controls["realCapacity"],
            this.Workfrom.realWater = this.Worknew.controls["realWater"],
            this.Workfrom.realImpurity = this.Worknew.controls["realImpurity"],
            this.Workfrom.measuredVolume = this.Worknew.controls["measuredVolume"],
            this.Workfrom.deductVolume = this.Worknew.controls["deductVolume"],
            this.Workfrom.realVolume = this.Worknew.controls["realVolume"],
            this.Workfrom.correctioFactor = this.Worknew.controls["correctioFactor"],
            this.Workfrom.aveDensity = this.Worknew.controls["aveDensity"],
            this.Workfrom.length = this.Worknew.controls["length"],
            this.Workfrom.wide = this.Worknew.controls["wide"],
            this.Workfrom.high = this.Worknew.controls["high"],
            this.Workfrom.unQuality = this.Worknew.controls["unQuality"],
            this.Workfrom.lossWater = this.Worknew.controls["lossWater"],
            this.Workfrom.lossNature = this.Worknew.controls["lossNature"],
            this.Workfrom.loss = this.Worknew.controls["loss"],
            this.Workfrom.checkNum = this.Worknew.controls["checkNum"],
            this.Workfrom.difference = this.Worknew.controls["difference"],
            this.Workfrom.slip = this.Worknew.controls["slip"],
            this.Workfrom.result = this.Worknew.controls["result"],
            this.Workfrom.barnType = this.Worknew.controls["barnType"]
        this.devices = [];
        this.problem = "all"
        this.classify = "new"
        this.sample = this.params.get('json')
        if (this.sample.autograph) {
            this._storage = this.sample.autograph
        } else {
            this.Storage.GetStorage("userLogin").subscribe(res => {
                res.then(res => {
                    this._storage = res.userName
                })
            })
        }
        console.log(this.sample)
        this._amount = this.sample.amount
        this.code = this.sample.sampleNo
        if (this.sample.barnTime) {
            this._barnTime = this.sample.barnTime.substring(0, 7)
        }

        // safetyReport/data
    }
    ionViewDidEnter() {
        //工作底稿的数据
        this.sampleId = {
            params: `{"sampleId":"${this.sample.id}"}`
        }
        this.Http.post("/grain/manuscript/data", this.sampleId).subscribe(res => {
            let work = res.json()
            if (work["rows"].length) {
                this.Work_flag = true
                this.Work = work["rows"][0]
                switch (this.Work.shape) {
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
                this.Work_flag = false
            }
        })
        let library = {
            "id": this.sample.pLibraryId
        }
        this.Http.post("/grain/library/get", library).subscribe(res => {
            this.plibraryName = res.json()["libraryName"]
        })
        // 安全报告的数据
        this.Http.post("/grain/safetyReport/data", this.sampleId).subscribe(res => {
            let safe = res.json()
            if (safe["rows"].length) {
                this.Safe_flag = true
                this.Safe = safe["rows"]
                for (var i = 0; i < this.Safe.length; i++) {
                    this.Safe[i].images = this.Safe[i].images.split(",")
                    this.Safe[i].images.forEach((index, v) => {
                        this.Safe[i].images[v] = `${APP_SERVE_URL}grain/upload/picture/${index}`
                    })
                }
            } else {
                this.Safe_flag = false
            }

        })
        // alert(111)
        // this.BLE.showBluetoothSettings()        

        // this.nativeService.showLoading();

    }
    segmentChanged(event) {
        switch (event.value) {
            case "unsolved":
                this._unsolvedimg = []
                this._unsolved = this.Safe.filter((i, v) => {
                    return i.isDeal == -1
                })
                break;
            case "solve":
                this._solveimg = []

                this._solve = this.Safe.filter((i, v) => {
                    return i.isDeal == 1
                })


        }
    }
    // 查看图片
    lookPicture(img) {
        this.photoViewer.show(img, "My title", { share: false })
    }
    solve(e) {
        // console.log(e)
        let data = {
            "isDeal": 1,
            "id": e.id
        }
        this.Http.post("grain/safetyReport/edit", data).subscribe(res => {
            this.Safe_img = []
            this.problem = "all"
            this.Http.post("/grain/safetyReport/data", this.sampleId).subscribe(res => {
                let safe = res.json()
                this.Safe = safe["rows"]
                for (var i = 0; i < this.Safe.length; i++) {
                    this.Safe[i].images = this.Safe[i].images.split(",")
                    this.Safe[i].images.forEach((index, v) => {
                        this.Safe[i].images[v] = `${APP_SERVE_URL}grain/upload/picture/${index}`
                    })
                }

            })
        })
    }
    onSubmit(e) {
        e.value.id = this.Work.id
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
            type: 2
        }
        this.Http.post("grain" + url, data).subscribe(res => {
        })
    }
    // 没有工作底稿的时候
    Workdetails() {
        this.navCtrl.push(detailsWorkPage, { "params": this.sample })
    }
    // 没有安全报告的时候
    Safedetails() {
        this.navCtrl.push(detaSafePage, { "params": this.sample })
    }
    //水分
    shuifen(font) {
        this.Work[font] = (this.Worknew.value[font] * 1).toFixed(1)
        this.lossWater()
        //    this.Work.storageWater = this.Work.storageWater.toFixed(1)
    }
    // 扦样信息中的打印条形码的功能
    _sample() {
        // this.ble.search().then(res => {
        //     if (this.code) {
        //         this.ble.print(this.code)
        //     } else {
                this.print()
        //     }
        // })
    }
    print() {
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
                            sampleState: 1,
                            autograph: this._storage
                        }
                        this.Http.post("/grain/sample/standSample", parpam).subscribe(res => {
                            this.data = res.json()
                            if (this.data.success) {
                                this.code = this.data.sampleNo
                                let params = {
                                    title: "提示",
                                    subTitle: "扦样成功",
                                    buttons: [
                                        {
                                            text: "确认",
                                            handler: () => {
                                                this.ble.print(this.code)
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
                                })
                                this.sample.sampleState = 1
                            } else {
                                if (this.sample.sampleState != 1) {
                                    let params = {
                                        title: "提示",
                                        subTitle: "扦样失败,请重新点击打印条形码",
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
                                    })
                                }
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
    //校正后修正系数保留
    correctioFactor() {
        this.Work.correctioFactor = (this.Worknew.value.correctioFactor * 1).toFixed(2)
    }
    //return 粮堆测量体积
    setmeasuredVolume() {
        let count
        let h = this.Worknew.value.high
        switch (this.shape) {
            case "work":
                var length = this.Worknew.value.length
                var wide = this.Worknew.value.wide
                count = (length * wide * h)
                break;
            case "yuanzhu":
                let s = 3.14 * Math.pow(this.Worknew.value.diameter * 1, 2) / 4
                count = (h * s)
                break;
            case "changfangjiezhuiti":
                let s1 = this.Worknew.value.topS
                let s2 = this.Worknew.value.bottomS
                count = ((s1 + s2 + Math.sqrt(s1 * s2)) * h / 3)
                break;
            case "qita":
                let gao2 = this.Worknew.value.high_2
                let chang2 = this.Worknew.value.length_2
                var length = this.Worknew.value.length
                var wide = this.Worknew.value.wide
                count = (h * length * wide + (h + gao2) * chang2 / 2)
                break;
        }
        this.Work.measuredVolume = count.toFixed(1)
        // this.sttj()
        this.setrealVolume()
    }
    // return 粮堆实际体积
    setrealVolume() {
        let measuredVolume = Number(this.Worknew.value.measuredVolume), deductVolume = Number(this.Worknew.value.deductVolume)
        this.Work.realVolume = measuredVolume - deductVolume
        this.setaveDensity()
    }
    //return 粮堆平均密度
    setaveDensity() {
        //粮食容重=实际容重
        let realCapacity = Number(this.Worknew.value.realCapacity), correctioFactor = Number(this.Worknew.value.correctioFactor)
        this.Work.aveDensity = (realCapacity * correctioFactor).toFixed(1)
        this.unQuality()
    }
    // return 测量计算数
    unQuality() {
        console.log(this.Work.realVolume, this.Worknew.value.aveDensity, this.Work.aveDensity)
        let realVolume = Number(this.Worknew.value.realVolume), aveDensity = Number(this.Work.aveDensity)//因为this.Worknew.value.aveDensity是上一个值
        console.log(realVolume, aveDensity)
        this.Work.unQuality = Math.round(realVolume * aveDensity)

        this.checkNum()
    }
    // return 水分减量
    lossWater() {
        let storageWater = Number(this.Worknew.value.storageWater) / 100, relaWater = Number(this.Worknew.value.realWater) / 100
        this.Work.lossWater = Math.round(this._amount * (storageWater - relaWater) / (1 - storageWater))
        console.log(storageWater, relaWater, this._amount * (storageWater - relaWater), (1 - storageWater))
        this.loss()
    }
    // return 合计
    loss() {
        let lossWater = Number(this.Worknew.value.lossWater), lossNature = Number(this.Worknew.value.lossNature)
        this.Work.loss = lossWater + lossNature
        // console.log(lossWater,lossNature)
        this.checkNum()
    }
    // return 检查计算数
    checkNum() {
        let unQuality = Number(this.Worknew.value.unQuality), loss = Number(this.Worknew.value.loss)
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
        let difference = Number(this.Worknew.value.difference), _amount = Number(this._amount)
        this.Work.slip = (difference / _amount * 1).toFixed(1)
    }
    // // 差数
    // difference() {
    //     var correctioFactor = this.Worknew.value.correctioFactor || 1
    //     var deductVolume = this.Worknew.value.deductVolume || 0
    //     var length = this.Worknew.value.length || 1
    //     var wide = this.Worknew.value.wide || 1
    //     var high = this.Worknew.value.high || 1
    //     // this.Work.difference = Math.round(this.sample.amount * 1000 - (((length * wide * high) - deductVolume) * (this.Worknew.value.realCapacity * correctioFactor) * 1 + (this.Worknew.value.lossWater * 1 + this.Worknew.value.lossNature * 1)))
    //     this.Work.difference = (this._amount * 1000) - this.Worknew.value.checkNum
    //     this.slip()
    // }
    // //差率
    // slip() {
    //     var correctioFactor = this.Worknew.value.correctioFactor || 1
    //     var deductVolume = this.Worknew.value.deductVolume || 0
    //     var length = this.Worknew.value.length || 1
    //     var wide = this.Worknew.value.wide || 1
    //     var high = this.Worknew.value.high || 1
    //     this.Work.slip = ((this.sample.amount * 1000 - (((length * wide * high) - deductVolume) * (this.Worknew.value.realCapacity * correctioFactor) * 1 + (this.Worknew.value.lossWater * 1 + this.Worknew.value.lossNature * 1))) / (this.sample.amount * 1000) * 100).toFixed(1)
    // }
    // // 合计
    // loss() {
    //     this.Work.loss = this.Worknew.value.lossWater * 1 + this.Worknew.value.lossNature * 1
    //     var correctioFactor = this.Worknew.value.correctioFactor || 1
    //     var deductVolume = this.Worknew.value.deductVolume || 0
    //     var length = this.Worknew.value.length || 1
    //     var wide = this.Worknew.value.wide || 1
    //     var high = this.Worknew.value.high || 1
    //     // this.Work.checkNum = Math.round(((length * wide * high) - deductVolume) * (this.Worknew.value.realCapacity * correctioFactor) * 1 + (this.Worknew.value.lossWater * 1 + this.Worknew.value.lossNature * 1))
    //     this.Work.checkNum = this.Worknew.value.unQuality + Number(this.Worknew.value.lossWater) + Number(this.Worknew.value.lossNature)
    //     this.difference()
    // }
    // // 测量计算数
    // unQuality() {
    //     var correctioFactor = this.Worknew.value.correctioFactor || 1
    //     var deductVolume = this.Worknew.value.deductVolume || 0
    //     var length = this.Worknew.value.length || 1
    //     var wide = this.Worknew.value.wide || 1
    //     var high = this.Worknew.value.high || 1
    //     this.Work.unQuality = Math.round(this.Work.realVolume * this.Work.aveDensity)
    //     // this.Work.unQuality = Math.round(((length * wide * high) - deductVolume) * (this.Worknew.value.realCapacity * correctioFactor))
    //     this.loss()
    // }
    // mianji() {
    //     var length = this.Worknew.value.length || 1
    //     var wide = this.Worknew.value.wide || 1
    //     var high = this.Worknew.value.high || 1
    //     this.Work.measuredVolume = (length * wide * high).toFixed(1);
    //     this.sttj()
    // }
    // //粮堆实体体积（m3）
    // sttj() {
    //     var deductVolume = this.Worknew.value.deductVolume || 0
    //     this.Work.realVolume = (this.Work.measuredVolume - deductVolume).toFixed(1)
    //     this.Work.checkNum = Math.round(this.Worknew.value.unQuality * 1 + this.Worknew.value.loss * 1)
    //     this.unQuality()


    // }
    // // 粮食容重
    // realCapacity() {
    //     this.Work.realCapacity = this.Worknew.value.realCapacity
    // }
    // // //容重
    // // rongzhong(e) {
    // //     this.Worknew.value.realCapacity = this.Worknew.value.realCapacity
    // // }
    // //粮堆平均密度（kg/m）
    // ldpjmd() {
    //     var correctioFactor = this.Worknew.value.correctioFactor || 1
    //     this.Work.aveDensity = (this.Worknew.value.realCapacity * correctioFactor).toFixed(1)
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
            that.Worknew.value.isMatch = data.value
            that.Work.isMatch = data.value
            if (data.value == "是") {
                this.isresult = true
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
            that.Worknew.value.barnType = data.value
            // that._barnType = data
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
            that.Worknew.value.qualityGrade = data.value
            // switch (data) {
            //     case 1:
            //         that._qualityGrade = "一等";
            //         break;
            //     case 2:
            //         that._qualityGrade = "二等"
            //         break;
            //     case 3:
            //         that._qualityGrade = "三等"

            // }
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
            // that.Worknew.value.putWay = data
            // console.log(data)
            that.Worknew.value.putWay = data.value
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