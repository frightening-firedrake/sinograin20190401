import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { HttpService } from '../../../../providers/httpService'
import { StorageService } from '../../../../providers/locationstorageService'

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { _alertBomb } from '../../../common/_alert'
import { Camera, CameraOptions } from '@ionic-native/camera';
import { dateSafeServe } from './detasafeSever'
import { APP_SERVE_URL } from "../../../../providers/config";
import { PhotoViewer } from '@ionic-native/photo-viewer';


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
    num
    _solveimg
    addrequ = false
    ImgJson = []
    _state = true;
    _unsolved: any = []
    _solve: any = []
    problem = "all"
    isrequire = false
    report_img = [];
    submitName
    userName;
    // 报告
    // 1是解决，2是未解决
    report: any
    constructor(public params: NavParams,
        public FormBuilder: FormBuilder,
        public camera: Camera,
        public dateser: dateSafeServe,
        public _alert: _alertBomb,
        public Http: HttpService,
        public navCtrl: NavController,
        private photoViewer: PhotoViewer,
        private storage: StorageService
    ) {
        this.storage.GetStorage("userLogin").subscribe(res => {
            res.then(res => {
                this.userName = res.userName
            })
        })
        this.data = this.params.get("params")
        console.log(this.data)
        this.dateser.setImg(this.ImgJson, 0)
        this.detaSafeForm = FormBuilder.group({

        })
        let data = {
            params: `{"sampleId":${this.data.id}}`
        }
        this.Http.post("grain/safetyReport/data", data).subscribe(res => {
            this.num = res.json()["rows"].length
            if (this.num) {
                this.submitName = "添加问题"
            } else {
                this.submitName = "提交"
                this.addrequ = true

            }
            console.log(res.json()["rows"])
            if (res.json()["rows"].length) {
                this._state = true
                this.report = res.json()["rows"]
                for (var i = 0; i < this.report.length; i++) {
                    this.report[i].images = this.report[i].images.split(",")

                    this.report[i].images.forEach((index, v) => {
                        console.log(this.report[i].images[v])
                        this.report[i].images[v] = `${APP_SERVE_URL}grain/upload/picture/${index}`
                    })
                }
                console.log(this.report)
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
                for (var i = 0; i < this.report.length; i++) {
                    this.report[i].images = this.report[i].images.split(",")
                    this.report[i].images.forEach((index, v) => {
                        console.log(this.report[i].images[v])
                        this.report[i].images[v] = `${APP_SERVE_URL}grain/upload/picture/${index}`
                    })
                }

            })
        })
    }
    // 查看图片
    lookPicture(img) {
        this.photoViewer.show(img, "My title", { share: false })
        // console.log(img)

    }
    onSubmit(e) {
        if (!this.addrequ) {
            this.addrequ = true
            this.submitName = "提交"
        } else {
            console.log(e)
            // console.log(this.ImgJson)
            this.dateser.getImg().subscribe(res => {
                res.forEach((i, v) => {
                    console.log(i.Imgarr.join())
                    var imgstr = i.Imgarr.join()
                    console.log(222222222222222222222222222222222222222222222222)
                    var succc = { "problem": this.keyVule[i.id - 1], "images": imgstr, "sampleId": this.data.id, "rummager": this.userName }
                    this.ImgJson.push(JSON.stringify(succc))
                    console.log(11111111111111111111111111111111111)
                    console.log(this.ImgJson)
                });
                let data = {
                    params: `[${this.ImgJson}]`
                }
                console.log(this.ImgJson, data)
                if (this.ImgJson.length) {
                    this.Http.post("grain/safetyReport/save", data).subscribe(res => {
                        this.isrequire = true
                        var parpam = {
                            title: "提示",
                            subTitle: "问题已提交",
                            buttons: [
                                {
                                    text: "确认",
                                    handler: () => {
                                        this.isrequire = false
                                        this.navCtrl.pop()
                                    }
                                }
                            ],
                            cssClass: "outsuccse only"
                        }
                        var addbuton = {
                            text: null
                        }
                        var addInput = []
                        this._alert._alertSmlpe(parpam, addbuton, addInput, function (data) { })
                    }, err => {
                        var parpam = {
                            title: "提示",
                            subTitle: "问题出错,请重新输入",
                            buttons: [
                                {
                                    text: "确认",
                                    handler: () => {
                                        this.isrequire = false
                                        this.navCtrl.pop()
                                    }
                                }
                            ],
                            cssClass: "outsuccse only"
                        }
                        var addbuton = {
                            text: null
                        }
                        var addInput = []
                        this._alert._alertSmlpe(parpam, addbuton, addInput, function (data) { })
                    })
                } else {
                    this.isrequire = true
                    var parpam = {
                        title: "提示",
                        subTitle: "请填写问题",
                        buttons: [
                            {
                                text: "确认",
                                handler: () => {
                                    this.isrequire = false
                                    // this.navCtrl.pop()
                                }
                            }
                        ],
                        cssClass: "outsuccse only"
                    }
                    var addbuton = {
                        text: null
                    }
                    var addInput = []
                    this._alert._alertSmlpe(parpam, addbuton, addInput, function (data) { })
                }
            })
        }


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
                // if (this._unsolved.length) {
                //     console.log(this._unsolved)                    
                //     for (var i = 0; i < this._unsolved.length; i++) {
                //         this._unsolved[i].images = this._unsolved[i].images.split(",")

                //         this._unsolved[i].images.forEach((index, v) => {
                //             console.log(this._unsolved[i].images[v])
                //             this._unsolved[i].images[v] = `${APP_SERVE_URL}grain/upload/picture/${index}`
                //         })
                //     }
                // }

                console.log(this._unsolved)
                break;
            case "solve":
                this._solveimg = []

                this._solve = this.report.filter((i, v) => {
                    return i.isDeal == 1
                })
            // if (this._solve.length) {
            //     console.log(this._solve)
            //     for (var i = 0; i < this._solve.length; i++) {
            //         this._solve[i].images = this._solve[i].images.split(",")

            //         this._solve[i].images.forEach((index, v) => {
            //             console.log(this._solve[i].images[v])
            //             this._solve[i].images[v] = `${APP_SERVE_URL}grain/upload/picture/${index}`
            //         })
            //     }
            //      console.log(this._solve)
            // }


        }
    }
}