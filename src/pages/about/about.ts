import { Component } from "@angular/core"
import { NavController } from "ionic-angular"

import { _alertBomb } from '../common/_alert'

import { setpassPage } from './setpass/setpass'

@Component({
    selector:"about",
    templateUrl:"./about.html"
})

export class AboutPage{
    constructor(
        public _alert:_alertBomb,
        public navCtrl:NavController
    ){}
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