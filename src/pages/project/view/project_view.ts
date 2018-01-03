import { Component,ViewChild,OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular'

import { Slides } from 'ionic-angular';
declare var $:any;

@Component({
    templateUrl: './project_view.html',
})
export class projectViewPage implements OnInit {
    @ViewChild(Slides) slides: Slides;
    pageIndex: any;
    oIndex: any;
    list:number;
    constructor(public params:NavParams) {
         this.list = params.get("list")
        //  console.log(this.list)
    };
   ngOnInit() {
    this.slides.pager = true;
    this.slides.paginationType = "fraction"
    
    }
   

}
