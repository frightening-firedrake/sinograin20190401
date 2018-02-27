import { Component } from "@angular/core"
import { NavController, ModalController } from "ionic-angular"

import { _alertBomb } from '../common/_alert'
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
        public modalCtrl: ModalController
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
    setpass() {
        this.navCtrl.push(setpassPage)
    }
}