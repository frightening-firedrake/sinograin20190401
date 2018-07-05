import { Component } from "@angular/core";
import { NavController, ViewController, App } from "ionic-angular";
import { StorageService } from '../../providers/locationstorageService'
import { HttpService } from '../../providers/httpService'

import { _alertBomb } from '../common/_alert'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'


@Component({
    selector: "login",
    templateUrl: "./login.html"
})
export class loginPage {
    private login: FormGroup;
    private User = {
        username: {},
        password: {}
    }
    private data: any;
    constructor(public _alert: _alertBomb,
        public appCtrl: App,
        public viewCtrl: ViewController,
        public FormBuilder: FormBuilder,
        public NavCtrl: NavController,
        public Storage: StorageService,
        public Http: HttpService
    ) {

        this.login = FormBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        })
        this.User.username = this.login.controls['username']
        this.User.password = this.login.controls["password"]
    }
    onSubmit(e) {
        console.log(e)
        // userName,userPass
        let parpam = {
            userName: e.value.username,
            userPass: e.value.password,
            verityCode: "1",
            captcha: "1"
        }
        this.Http.post('/grain/login', parpam).subscribe(res => {
            this.data = res.json()
            if (this.data.success) {
                this.Storage.SetStorage("userLogin", this.data.user)
                this.viewCtrl.dismiss(this.data.user);
            } else {
                var parpam = {
                    title: "提示",
                    subTitle: "用户名或密码错误",
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

        }, error => {

        })
        // this.NavCtrl.pop()
        // this.Storage.SetStorage("userLogin", { "username": e.value.username, "passwork": e.value.passwork })
    }
}