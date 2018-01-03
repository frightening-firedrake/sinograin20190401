import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StorageService } from '../../../../providers/locationstorageService';
import { MyHeardePage } from '../../my_hearde.component';

@Component({
    templateUrl:"./name.component.html"
})
export class namePage{
     name:string = "";
    constructor(private nav:NavController,private Storage:StorageService){}
    ionViewWillEnter(){
        this.Storage.GetStorage("name").subscribe((res)=>{
            res.then((val)=>{
                this.name = val
            })
        })
    }
    onsubmit(){
        this.nav.pop()
        this.Storage.SetStorage("name",this.name)
    }
} 