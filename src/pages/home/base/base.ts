import { Component } from '@angular/core';
import { NavController } from 'ionic-angular'

import { newSamp } from '../new/new'

@Component({
    selector: "base",
    templateUrl: "./base.html"
})

export class basePage {
    lists = [
        {
            text: "本库"
        },
        {
            text: "山西京城国家粮食储备库"
        }, {
            text: "厂子分库"
        }, {
            text: "山西屯留国家粮食储备库"
        }, {
            text: "陵城分库"
        }, {
            text: "山西屯留国家粮食储备库"
        },
    ]
    constructor(public navCtrl: NavController) {

    }

    newpage(index) {
        this.navCtrl.push(newSamp,{
            "json":this.lists[index]
        })
    }

}