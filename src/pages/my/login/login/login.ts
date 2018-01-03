import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AlertController } from 'ionic-angular';

import { HttpService } from '../../../../providers/httpService';
import { NativeService } from '../../../../providers/nativeService';
import { StorageService } from '../../../../providers/locationstorageService';


import { HomePage } from '../../../home/home';
import { RegisterPage } from '../register/register';
import { ForgetPage } from '../forget/forget';
import { LoginHearderPage } from '../login_header';

@Component({
    templateUrl: 'login.html'
})
export class LoginPage {
    title: string;
    userName: any;
    password: any;
    loginForm: FormGroup;
    aaa:any;
    constructor(
        public nav: NavController,
        public viewCtrl: ViewController,
        public httpService: HttpService,
        public nativeService: NativeService,
        public FormBuilder: FormBuilder,
        public alert: AlertController,
        public Storage: StorageService
    ) {
        this.title = "登录"
        this.loginForm = FormBuilder.group({
            username: ['', Validators.compose([Validators.maxLength(11), Validators.minLength(11), Validators.required, Validators.pattern("^(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$")])],
            password: ['', [Validators.minLength(6)]],
        })
        this.userName = this.loginForm.controls["username"]
        this.password = this.loginForm.controls["password"]
    }



    register() {
        this.nav.push(RegisterPage);
        // this.viewCtrl.dismiss();
    }

    forget() {
        this.nav.push(ForgetPage);
    }
    // login(){

    //     const res= /^1[3,4,5,7,8][0-9]{9}$/;
    //     if(res.test(this.userName)){
    //        console.log(this.userName)
    //         this.httpService.post("member/login",{username:this.userName,password: this.password})
    //     .subscribe(res=>{

    //        console.info(res.json())
    //     //    if(res.json().<100){
    //     //          this.nav.push(HomePage);
    //     //    }
    //     //    this.nativeService.showToast(res.msg);
    //     })
    //     }else{
    //         this.nativeService.showToast('手机号码格式错误，请重新输入');
    //     }   

    // }
    onSubmit(obj) {
        // let usernames = JSON.stringify(obj.value.username)
        this.Storage.SetStorage("user", {phone:obj.value.username})
        // 弹出登录成功
        let alert = this.alert.create({
            title: '欢迎登录',
            subTitle: '',
            buttons: [{
                text: "OK",
                role: "alert",
                handler: () => {
                    this.viewCtrl.dismiss();
                }
            }]
        });
        alert.present();
    }
}