import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';

@Component({
    selector:"new-list",
    templateUrl:"newlist.html"
})

export class NewListPage{
    param:any={
        title:"加载中",
        id:null
    }
    constructor(private navCtrl: NavController,
                private params: NavParams){
                    let param = this.params.get("params")
                    if(param){
                         this.param.title = param.title 
                        this.param.id = param.id
                    }
                }
}