import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { _alertBomb } from '../pages/common/_alert'
import { StorageService } from './locationstorageService'

@Injectable()
export class AuthorityService {
    public flag;
    public roleName = "";
    constructor(
        private Storage: StorageService,
        public _alert: _alertBomb
    ) {

    }
    //1.扦样人员2.样品人员3.超级管理员
    validate(event) {
        console.log(event)
        return new Promise((resolve, reject) => {
            this.Storage.GetStorage("userLogin").subscribe(res => {
                res.then(res => {
                    try {
                        this.roleName = res.roleName
                        if (event == this.roleName) {
                            this.flag = true
                            resolve()
                        } else if (event == "超级管理员" || this.roleName == "超级管理员") {
                            this.flag = true
                            resolve()
                        } else {
                            this.Alert()
                            this.flag = false
                        }
                    } catch (e) {

                    }
                })
            })
        })
        // switch (event) {
        //     case "1":
        //         this.locroleName = "扦样员"
        //         break;
        //     case "2":
        //         this.locroleName = "库管员"
        //         break;
        //     case "3":
        //         this.locroleName = "超级管理员"
        //         break;
        // }

    }
    Alert() {
        var parpam = {
            title: "提示",
            subTitle: "你没有权限访问该页面<br/>请联系管理员获取权限",
            buttons: [
                {
                    text: "确认",
                    handler: () => {

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
}