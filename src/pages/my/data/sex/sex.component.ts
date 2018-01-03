import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageService } from '../../../../providers/locationstorageService';
import { MyHeardePage } from '../../my_hearde.component';

@Component({
    templateUrl:"./sex.component.html"
})
export class sexPage{
    private select:number = 2
    constructor(private nav: NavController,private Storage:StorageService){}
    ionViewWillEnter(){
        this.Storage.GetStorage("sex").subscribe((res)=>{
            res.then((val)=>{
                this.select = val
            })
        })
    }
    onsubmit(){
        this.Storage.SetStorage("sex",this.select)
        this.nav.pop()
    }
} 