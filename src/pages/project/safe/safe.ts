import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HomeService } from '../../home/home.serve'
import { _alertBomb } from '../../common/_alert'

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
    selector: "safe_speech",
    templateUrl: "./safe.html"
})

export class safePage {
    data: any;
    gender: any;
    SafeForm: FormGroup;
    lists = [1]
    keyVule: any = [];
    _state:boolean = false
    problem:string = "all"
    istrue:boolean = true
    _unsolved:any = []
    _solve:any = []
    // 报告
    // 1是解决，2是未解决
    report:any = [
        {
            creatTime:"2017-9-25",
            problem:"没有解决",
            thumb:["http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg","http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg","http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg","http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg"],
            state:2, 
        },
        {
            creatTime:"2017-1-25",
            problem:"没有解决",
            thumb:["http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg","http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg","http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg","http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg"],
            state:2, 
        },
        {
            creatTime:"2017-3-25",
            problem:"没有解决",
            thumb:["http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg","http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg","http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg","http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg"],
            state:2, 
        },
        {
            creatTime:"2017-4-25",
            problem:"解决",
            thumb:["http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg","http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg","http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg","http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg"],
            state:1, 
        },
        {
            creatTime:"2017-5-25",
            problem:"没有解决",
            thumb:["http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg","http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg","http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg","http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg"],
            state:2, 
        }
        
    ]
    constructor(
        public params: NavParams,
        public FormBuilder: FormBuilder,
        public camera: Camera,
        public Home: HomeService,
        public ble: BLE,
        public _alert: _alertBomb
    ) {
        this.data = this.params.get('json');
        this.gender = this.params.get("newpage")
        // 判断是否是有安全报告的
        if(this.data.state == 1){
            this._state = true
        }
        this.SafeForm =  FormBuilder.group({

        })
    }
    ionViewCanLeave() {
        this.Home.setgender(this.gender)
    }
    keyoff(event, index) {
        this.keyVule[index] = event.srcElement.value
    }
    add() {
        if (this.keyVule[this.lists.length - 1]) {
            this.lists.push(1)
        }
    }
    solve(event){
        let parpam = {
            title:"安全报告",
            message:"此项操作不可逆，请慎重删除！",
            subTitle:"确认此项已经解决？",
            buttons:[
                {
                    text:"取消",
                    handler:()=>{
                        
                    }
                },
                {
                    text:"确认",
                    handler:()=>{
                        event.state = 1
                    }
                }
            ],
            cssClass:"succse outsuccse "
        }
          var addbuton = {
      
    }
    var addInput = []
        this._alert._alertSmlpe(parpam,addbuton,addInput,data=>{
            console.log(111)
        })
        // event.state = 1
    }
    remove(){
        this.lists.pop()
    }
    segmentChanged(event){
        switch(event.value){
            case "unsolved":
               this._unsolved = this.report.filter((i,v)=>{
                   return i.state == 2
               })
            break;
            case "solve":
                this._solve = this.report.filter((i,v)=>{
                    return i.state == 1
                })
        }
    }
    onSubmit(e) {
        console.log(e)
    }
    _ble() {
        this.ble.enable().then(res => {
            console.log(res)
            this.ble.showBluetoothSettings().then(res => {
                this.ble.scan([], 10).subscribe(res => {
                    console.log(111)
                    console.log(res.id)
                    this.ble.connect(res.id).subscribe(res=>{
                        console.log(res)
                    })
                    //     //    var adData = new Uint8Array(res.advertising)
                    //     //    console.log(adData)
                })
            })

        })

    }
}