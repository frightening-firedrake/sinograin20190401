import { Component } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { NavController } from 'ionic-angular';
import { StorageService } from '../../../providers/locationstorageService';

import { MyHeardePage } from '../my_hearde.component';

@Component({
    templateUrl:"qrcode.component.html",
})

export class QrcodePage{
    user: any = {
        
    } 
    constructor(private Storage:StorageService,private nav:NavController){}
        ionViewWillEnter() {
        this.Storage.GetStorage("nickname").subscribe((res)=>{
            res.then((val)=>{
                this.user.nickname = val
            })
        })
        this.Storage.GetStorage("sex").subscribe((res)=>{
            res.then((val)=>{
              switch(val){
                    case '1':
                        this.user.sex = "男"
                    break;
                    case '2':
                        this.user.sex = "女"
                    break;
                }
            })
        })
        this.Storage.GetStorage("name").subscribe((res)=>{
            res.then((val)=>{
                this.user.name = val
            })
        })
    }
    
    
}