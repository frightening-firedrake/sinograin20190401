import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HomeService } from '../../home/home.serve'

import { _alertBomb } from '../../common/_alert'
import { workViewPage } from './work_view/work_view'


@Component({
    selector: "work",
    templateUrl: "./work.html"
})

export class workPage {
    data: any;
    gender: any;
    private Workfrom = {
        _strain: "无",
        _type: "无",
        myDate: {},
        reservoir_area: "",//所在库区
        storage_from: {},//储存形式
        bgzsl: {},//保管帐数量（kg）
        quality: "",//质量等级
        //stored_way:['人工入仓'],//入仓方式
        stored_way: "",//入仓方式
        //粮食入库质量
        volume_weigh_i: {},//容重（g/l）  
        water_content_i: {},//水分（%）
        impurity_i: {},//杂质（%）  
        //实测粮食质量
        volume_weigh_r: {},//容重（g/l）  
        water_content_r: {},//水分（%）
        impurity_r: {},//杂质（%） 
        //粮堆形状及基本尺寸
        long: {},//长（m）：
        width: {},//宽（m）：
        height: {},//高（m）：
        //1.计算粮堆体积
        volume_c: {},//粮堆测量体积(m3)	
        volume_q: {},//需要扣除体积(m3)	
        volume_r: {},//粮堆实际体积(m3)	
        //2.计算粮堆平均密度	
        //          标准容重器法
        volume_weigh_bz: {},//粮食容重（g/l）
        correction_factor_bz: {},//校正后修正系数
        average_density_bz: {},//粮堆平均密度（kg/m³）
        //          特制大容器法{}
        unit_volume_weight_tz: {},//单位体积粮食重量（kg/m³）
        correction_factor_tz: {},//校正后修正系数
        average_density_tz: {},//粮堆平均密度（kg/m³）
        //3.计算粮食数量
        weight_measure: {},//测量计算数（kg）	
        //          应记粮食损耗(kg)	
        weight_humidity: {},//水分减量
        weight_natural: {},//保管自然损耗
        weight_total: {},//合计
        weight_calculation: {},//检查计算数（kg）	
        //4.认定粮食实际数量	
        //          检查计算数与保管账数量比较
        difference: {},//差数（kg）
        slip: {},//差率（％）
        is_same: {},//账实是否相符
        weight_r: {},//粮食实际数量（kg）
        difference_r: {},//账实不符原因   
        remarks: {},//备注
    }
    private Work: FormGroup;

    private addButton: any = {
        text: "确认"
    }
    constructor(public Home: HomeService, public params: NavParams, public navCtrl: NavController, public _alert: _alertBomb, public FormBuilder: FormBuilder) {
        this.data = this.params.get("json")
        this.gender = this.params.get("newpage")
        this.Work = FormBuilder.group({
            myDate: ['', [Validators.minLength(4)]],
            bgzsl: ['', [Validators.minLength(4)]],
            volume_weigh_i: ['', [Validators.minLength(4)]],
            water_content_i: ['', [Validators.minLength(4)]],
            impurity_i: ['', [Validators.minLength(4)]],
            volume_weigh_r: ['', [Validators.minLength(4)]],
            water_content_r: ['', [Validators.minLength(4)]],
            impurity_r: ['', [Validators.minLength(4)]],
            long: ['', [Validators.minLength(4)]],
            width: ['', [Validators.minLength(4)]],
            height: ['', [Validators.minLength(4)]],
            volume_c: ['', [Validators.minLength(4)]],
            volume_q: ['', [Validators.minLength(4)]],
            volume_r: ['', [Validators.minLength(4)]],
            volume_weigh_bz: ['', [Validators.minLength(4)]],
            correction_factor_bz: ['', [Validators.minLength(4)]],
            average_density_bz: ['', [Validators.minLength(4)]],
            unit_volume_weight_tz: ['', [Validators.minLength(4)]],
            correction_factor_tz: ['', [Validators.minLength(4)]],
            average_density_tz: ['', [Validators.minLength(4)]],
            weight_measure: ['', [Validators.minLength(4)]],
            weight_humidity: ['', [Validators.minLength(4)]],
            weight_natural: ['', [Validators.minLength(4)]],
            weight_total: ['', [Validators.minLength(4)]],
            weight_calculation: ['', [Validators.minLength(4)]],
            difference: ['', [Validators.minLength(4)]],
            slip: ['', [Validators.minLength(4)]],
            is_same: ['', [Validators.minLength(4)]],
            weight_r: ['', [Validators.minLength(4)]],
            difference_r: ['', [Validators.minLength(4)]],
            remarks: ['', [Validators.minLength(4)]],
        })
        this.Workfrom.myDate = this.Work.controls["myDate"]
        this.Workfrom.bgzsl = this.Work.controls["bgzsl"]
        this.Workfrom.volume_weigh_i = this.Work.controls["volume_weigh_i"],
        this.Workfrom.water_content_i = this.Work.controls["water_content_i"],
        this.Workfrom.impurity_i = this.Work.controls["impurity_i"],
        this.Workfrom.volume_weigh_r = this.Work.controls["volume_weigh_r"],
        this.Workfrom.water_content_r = this.Work.controls["water_content_r"],
        this.Workfrom.impurity_r = this.Work.controls["impurity_r"],
        this.Workfrom.long = this.Work.controls["long"],
        this.Workfrom.width = this.Work.controls["width"],
        this.Workfrom.height = this.Work.controls["height"],
        this.Workfrom.volume_c = this.Work.controls["volume_c"],
        this.Workfrom.volume_q = this.Work.controls["volume_q"],
        this.Workfrom.volume_r = this.Work.controls["volume_r"],
        this.Workfrom.volume_weigh_bz = this.Work.controls["volume_weigh_bz"],
        this.Workfrom.correction_factor_bz = this.Work.controls["correction_factor_bz"],
        this.Workfrom.average_density_bz = this.Work.controls["average_density_bz"],
        this.Workfrom.unit_volume_weight_tz = this.Work.controls["unit_volume_weight_tz"],
        this.Workfrom.correction_factor_tz = this.Work.controls["correction_factor_tz"],
        this.Workfrom.average_density_tz = this.Work.controls["average_density_tz"],
        this.Workfrom.weight_measure = this.Work.controls["weight_measure"],
        this.Workfrom.weight_humidity = this.Work.controls["weight_humidity"],
        this.Workfrom.weight_natural = this.Work.controls["weight_natural"],
        this.Workfrom.weight_total = this.Work.controls["weight_total"],
        this.Workfrom.weight_calculation = this.Work.controls["weight_calculation"],
        this.Workfrom.difference = this.Work.controls["difference"],
        this.Workfrom.slip = this.Work.controls["slip"],
        this.Workfrom.is_same = this.Work.controls["is_same"],
        this.Workfrom.weight_r = this.Work.controls["weight_r"],
        this.Workfrom.difference_r = this.Work.controls["difference_r"],
        this.Workfrom.remarks = this.Work.controls["remarks"]
    }
    ionViewCanLeave() {
        this.Home.setgender(this.gender)
    }
    onSubmit(e) {
        console.log(e)
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
                label: '食用油',
                value: '食用油'
            },
        ]
        this._alert._alertSmlpe(parpam, this.addButton, addInput, data => {
            this.Workfrom._strain = data
        })
    }
    type() {
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
            this.Workfrom._type = data
        })
    }
}