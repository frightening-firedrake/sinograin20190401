import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { HttpService } from '../../../../providers/httpService'

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HomeService } from '../../../home/home.serve'
import { _alertBomb } from '../../../common/_alert'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { dateSafeServe } from './detasafeSever'
import { APP_SERVE_URL } from "../../../../providers/config";


@Component({
    selector: "detailsSafe",
    templateUrl: "./detailsSafe.html",
})

export class detaSafePage {
    lists = [1]
    keyVule: any = [];
    detaSafeForm: FormGroup;
    data;
    _unsolvedimg
    _solveimg
    ImgJson = []
    _state = true;
    _unsolved: any = []
    _solve: any = []
    problem = "all"
    report_img = [];
    // 报告
    // 1是解决，2是未解决
    report: any
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
            params: `{"sampleId":${this.data.id}}`
        }
        this.Http.post("grain/safetyReport/data", data).subscribe(res => {
            console.log(res.json()["rows"][0])
            if (res.json()["rows"].length) {
                this._state = true
                this.report = res.json()["rows"]
                this.report[0].images.split(",").forEach((i, v) => {
                    this.report_img.push(`${APP_SERVE_URL}grain/upload/picture/${i}`)
                })
            } else {
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
     solve(e) {
        // console.log(e)
        let data = {
            "isDeal": 1,
            "id": e.id
        }
        let id = {
              params: `{"sampleId":${this.data.id}}`
        }
        this.Http.post("grain/safetyReport/edit", data).subscribe(res => {
            this.report_img = []
            this.problem = "all"
            this.Http.post("/grain/safetyReport/data", id).subscribe(res => {
                this._state = true
                this.report = res.json()["rows"]
                this.report[0].images.split(",").forEach((i, v) => {
                    this.report_img.push(`${APP_SERVE_URL}grain/upload/picture/${i}`)
                })

            })
        })
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
                let data = {
                    params: `[${this.ImgJson}]`
                }
                console.log(this.ImgJson, data)
                this.Http.post("grain/safetyReport/save", data).subscribe(res => {
                    console.log(res)
                })
            });

        })

        // console.log(this.keyVule)

    }
    segmentChanged(event) {
        console.log(event)
        switch (event.value) {
            case "unsolved":
                this._unsolvedimg = []
                this._unsolved = this.report.filter((i, v) => {
                    return i.isDeal == -1
                })
                if (this._unsolved.length) {
                    this._unsolved[0].images.split(",").forEach((i, v) => {
                        this._unsolvedimg.push(`${APP_SERVE_URL}grain/upload/picture/${i}`)
                    })
                }

                console.log(this._unsolvedimg)
                break;
            case "solve":
                this._solveimg = []

                this._solve = this.report.filter((i, v) => {
                    return i.isDeal == 1
                })
                if (this._solve.length) {
                    this._solve[0].images.split(",").forEach((i, v) => {
                        this._solveimg.push(`${APP_SERVE_URL}grain/upload/picture/${i}`)
                    })
                }


        }
    }
}