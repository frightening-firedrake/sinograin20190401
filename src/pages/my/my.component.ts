import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

import { StorageService } from '../../providers/locationstorageService';

import { LoginPage } from './login/login/login';
import { ScanPage } from './scan/scan.component';
import { CameraPage } from './camera/camera.component'
import { geolocationPage } from './geolocation/geolocation.component';
import { DataPage } from "./data/data.component"
import { QrcodePage } from './qrcode/qrcode.component'

@Component({
    templateUrl: "my.component.html",
})

export class Mypage {
    userexist: boolean;
    constructor(
        public nav: NavController,
        public Storage: StorageService
    ) {

    }
    ionViewWillEnter() {
        this.Storage.GetStorage("user").subscribe((res) => {
            res.then((val) => {
                if(val){
                    this.userexist = true
                }else{
                    this.userexist = false;
                }
            })
        })
    }
    login() {
        this.nav.push(LoginPage)
    }
    goscan(){
        this.nav.push(ScanPage)
    }
    gocamera(){
        this.nav.push(CameraPage)
    }
    golocation(){
        this.nav.push(geolocationPage)
    }
    godata(){
        this.nav.push(DataPage)
    }
    goqrcode(){
        this.nav.push(QrcodePage)
    }
}