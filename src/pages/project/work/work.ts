import { Component } from '@angular/core';
import { NavParams,NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { workViewPage } from './work_view/work_view'

@Component({
    selector:"work",
    templateUrl:"./work.html"
})

export class workPage{
    data:any
    constructor(public params:NavParams,public navCtrl:NavController){
        this.data = this.params.get("json")
        console.log(this.data)
    }
    goshow(){
        this.navCtrl.push(workViewPage)
    }
}