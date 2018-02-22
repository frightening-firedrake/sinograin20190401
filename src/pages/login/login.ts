import { Component } from "@angular/core";
import { NavController,ViewController  } from "ionic-angular";
import { StorageService } from '../../providers/locationstorageService'

import { _alertBomb } from '../common/_alert'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'


@Component({
    selector:"login",
    templateUrl:"./login.html"
})

export class loginPage{
    private login:FormGroup;
    private User = {
        username:{},
        passwork:{}
    }
    constructor(public _alert:_alertBomb,public viewCtrl:ViewController, public FormBuilder: FormBuilder,public NavCtrl: NavController,public Storage:StorageService){
        this.login = FormBuilder.group({
            username:['', [Validators.minLength(4)]],
            passwork:['', [Validators.minLength(4)]]
        })
        this.User.username = this.login.controls['username']
        this.User.passwork = this.login.controls["passwork"]
    }
    onSubmit(e){
        console.log(e)
       this.NavCtrl.pop()
        this.Storage.SetStorage("userLogin",{"username":e.value.username,"passwork":e.value.passwork})
    }
}