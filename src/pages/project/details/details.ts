import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
    selector:"derails",
    templateUrl:"./details.html"
})

export class detaildPage{
    classify:any
    constructor(public params: NavParams){
        this.classify = "new"
    }
}