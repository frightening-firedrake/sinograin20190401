import { Component } from "@angular/core"
import { NavController } from "ionic-angular"

import { _alertBomb } from '../common/_alert'
import { StorageService } from '../../providers/locationstorageService'

import { setpassPage } from './setpass/setpass'

@Component({
    selector:"about",
    templateUrl:"./about.html"
})

export class AboutPage{
    public userName:string;
    constructor(
        public _alert:_alertBomb,
        public navCtrl:NavController,
        public Storage: StorageService
    ){
        this.Storage.GetStorage("userLogin").subscribe(res=>{
            res.then(suc=>{
                this.userName = suc.userName
            })
        })
    }
    update(){
        var parpam = {
            title:"提示",
            subTitle:"已经是最新版本",
            buttons:[
                {
                    text:"确认",
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
    setpass(){
        this.navCtrl.push(setpassPage)
    }
}