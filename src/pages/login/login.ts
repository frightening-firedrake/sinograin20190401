import { Component } from "@angular/core";
import { NavController,ViewController  } from "ionic-angular";

import { _alertBomb } from '../common/_alert'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { TabsPage } from '../tabs/tabs'

@Component({
    selector:"login",
    templateUrl:"./login.html"
})

export class loginPage{
    constructor(public _alert:_alertBomb,public viewCtrl:ViewController, public FormBuilder: FormBuilder,public NavCtrl: NavController){
        
    }
    onSubmit(e){
        // this.viewCtrl.dismiss()
        this.NavCtrl.push(TabsPage)
    }
}