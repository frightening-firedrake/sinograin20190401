import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { HttpService } from '../../../../providers/httpService';
import { NativeService } from '../../../../providers/nativeService';
import { StorageService } from '../../../../providers/locationstorageService';
import { mobileValidator, equalValidator } from "../../../../providers/validators";

import { LoginPage } from '../login/login';

@Component({
    templateUrl: 'register.html',
})
export class RegisterPage {
    Mytitle: string;
    isflag: boolean = false;
    registerForm: FormGroup;
    phone: any;
    passwordGroup: any;
    password: any;
    pconfirm: any;
    constructor(public nav: NavController,
        public httpService: HttpService,
        public viewCtrl: ViewController,
        public nativeService: NativeService,
        public Storage: StorageService,
        private formBuilder: FormBuilder,
    ) {
        this.Mytitle = "注册"
        this.registerForm = formBuilder.group({
            phone: ['', Validators.compose([Validators.maxLength(11), Validators.minLength(11), Validators.required, Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
            passwordGroup: formBuilder.group({
                password: ['', [Validators.minLength(6)]],
                pconfirm: [""]
            }, { validator: equalValidator })
        })
        this.phone = this.registerForm.controls["phone"]
        this.passwordGroup = this.registerForm.controls["passwordGroup"]
        this.password = this.passwordGroup.controls["password"]
        this.pconfirm = this.passwordGroup.controls["pconfirm"]
    }

    login() {
        this.nav.push(LoginPage);
        this.viewCtrl.dismiss();
    }
    checks(e) {
        this.isflag = e;
    }
    onSubmit(obj) {
        // // console.log(obj)
        // if (!this.Storage.GetStorage("user")) {
        //     this.Storage.SetStorage("user", `{phone: ${obj._value.phone} }`)
        // }
        
    }
}