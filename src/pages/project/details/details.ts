import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { DatePipe } from '@angular/common';

@Component({
    selector:"derails",
    templateUrl:"./details.html"
})

export class detaildPage{
    classify:any
    sample:any
    dateStr:string
    constructor(public params: NavParams){
        this.classify = "new"
        this.sample = this.params.get('json')
    }
    
}