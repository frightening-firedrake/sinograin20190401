import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageService } from '../../../../providers/locationstorageService';
import { MyHeardePage } from '../../my_hearde.component';

@Component({
    templateUrl:"./nickname.component.html"
})
export class nicknamePage{
    nickname:string = "";
    constructor(private nav:NavController,private Storage:StorageService){}
    ionViewWillEnter(){
        this.Storage.GetStorage("nickname").subscribe((res)=>{
            res.then((val)=>{
                this.nickname = val
            })
        })
    }
    onsubmit(){
        this.nav.pop()
        this.Storage.SetStorage("nickname",this.nickname)
    }
} 