import { Component } from "@angular/core"
import { NavController, ModalController } from "ionic-angular"

import { _alertBomb } from '../common/_alert'
import { AppVersion } from '@ionic-native/app-version';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpService } from '../../providers/httpService'
import { StorageService } from '../../providers/locationstorageService'

import { setpassPage } from './setpass/setpass'
import { loginPage } from '../login/login'

@Component({
    selector: "about",
    templateUrl: "./about.html"
})

export class AboutPage {
    public userName: string;
    constructor(
        public _alert: _alertBomb,
        public navCtrl: NavController,
        public Storage: StorageService,
        public modalCtrl: ModalController,
        public App: AppVersion,
        public Http: HttpService,
        public iab:InAppBrowser
    ) {
        this.Storage.GetStorage("userLogin").subscribe(res => {
            res.then(suc => {
                this.userName = suc.userName
            })
        })
    }
    clear() {
        this.Storage.RemoveStorage("userLogin").then(res => {
            this.navCtrl.parent.select(0);
            let profileModal = this.modalCtrl.create(loginPage);
            profileModal.present();
        })


    }
    update() {

        this.App.getVersionNumber().then(res => {
            console.log(res)
            var data = {
                "v": res
            }
            this.Http.get("http://yh.ityyedu.com/check_update.php", data).subscribe(res => {
                if (res.json()["error_no"] == 100) {
                    this.iab.create("http://yh.ityyedu.com/check_update.php?a=download",'_system')
                } else {
                    var parpam = {
                        title: "提示",
                        subTitle: "已经是最新版本",
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
            })
        })
    }
    setpass() {
        this.navCtrl.push(setpassPage)
    }
}