import { Component } from '@angular/core';
import { StorageService } from '../../../providers/locationstorageService';
import { NavController } from 'ionic-angular';

import { UserPhotoPage } from './photo/photo.component'
import { MyHeardePage } from '../my_hearde.component';
import { sexPage } from './sex/sex.component';
import { namePage } from './name/name.component';
import { nicknamePage } from './nickname/nickname.component'

@Component({
    templateUrl: "./data.component.html"
})

export class DataPage {
    private imgUrl: string = ""
    private nickname: string =""
    private sex: string ="" 
    private name: string=""
    constructor(private nav: NavController, private Storage: StorageService) { }
    ionViewWillEnter() {
        this.Storage.GetStorage("UserImg").subscribe((res) => {
            // this.imgUrl = res?res:"https://ionicframework.com/dist/preview-app/www/assets/img/avatar-finn.png"
            res.then((val) => {
                this.imgUrl = val ? val : "https://ionicframework.com/dist/preview-app/www/assets/img/avatar-finn.png";
            })
        })
        this.Storage.GetStorage("nickname").subscribe((res)=>{
            res.then((val)=>{
                this.nickname = val
            })
        })
        this.Storage.GetStorage("sex").subscribe((res)=>{
            res.then((val)=>{
                switch(val){
                    case '1':
                        this.sex = "男"
                    break;
                    case '2':
                        this.sex = "女"
                    break;
                }
            })
        })
        this.Storage.GetStorage("name").subscribe((res)=>{
            res.then((res)=>{
                this.name = res
            })
        })
    }
    setphont() {
        this.nav.push(UserPhotoPage)
    }
    setnickname() {
        this.nav.push(nicknamePage)
    }
    setname() {
        this.nav.push(namePage)
    }
    setsex() {
        this.nav.push(sexPage)
    }
}