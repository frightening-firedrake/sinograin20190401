import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HttpService } from '../../../../providers/httpService'

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HomeService } from '../../../home/home.serve'
import { _alertBomb } from '../../../common/_alert'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { dateSafeServe } from './detasafeSever'

@Component({
    selector: "detailsSafe",
    templateUrl: "./detailsSafe.html",
})

export class detaSafePage {
    lists = [1]
    keyVule: any = [];
    detaSafeForm: FormGroup;
    data;
    ImgJson = []
    _state = true;
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
    constructor(public params: NavParams,
        public FormBuilder: FormBuilder,
        public camera: Camera,
        public Home: HomeService,
        public dateser: dateSafeServe,
        public _alert: _alertBomb,
        public Http: HttpService
    ) {
        this.data = this.params.get("params")
        console.log(this.data)
        this.detaSafeForm = FormBuilder.group({

        })
        let data = {
            params:`{"sampleId":${this.data.id}}`
        }
        this.Http.post("grain/safetyReport/data",data).subscribe(res=>{
            console.log(res.json()["rows"].length)
            if(res.json()["rows"].length){
                this._state = true
            }else{
                this._state = false
            }
        })
    }
    keyoff(event, index) {
        this.keyVule[index] = event.srcElement.value
    }
    add() {
        if (this.keyVule[this.lists.length - 1]) {
            this.lists.push(1)
            this.dateser.getImg().subscribe(res => {
                // res.forEach((i, v) => {
                //     var imgstr = i.Imgarr.join()
                //     let succc = { "problem": this.keyVule[i.id - 1], "images": imgstr, "sampleId": this.data.id }
                //     this.ImgJson.push(succc)
                // });
                // 
            })

        }
    }
    remove() {
        this.lists.pop()
        this.ImgJson.pop()
    }
    onSubmit(e) {
        console.log(e)
        // console.log(this.ImgJson)
        this.dateser.getImg().subscribe(res => {
            res.forEach((i, v) => {
                console.log(i.Imgarr.join())
                var imgstr = i.Imgarr.join()
                console.log(succc)
                var succc = { "problem": this.keyVule[i.id - 1], "images": imgstr, "sampleId": this.data.id }
                console.log(succc)
                this.ImgJson.push(JSON.stringify(succc))
                console.log(111)
                let data ={
                    params:`[${this.ImgJson}]`
                }
                console.log(this.ImgJson,data)
                this.Http.post("grain/safetyReport/save",data).subscribe(res => {
                    console.log(res)
                })
            });
            
        })

        // console.log(this.keyVule)

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
}