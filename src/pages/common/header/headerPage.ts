import { Component,OnInit,Input } from '@angular/core';
import { NavController } from 'ionic-angular';



@Component({
    selector: 'app-header',
    templateUrl: 'headerPage.html'
})
export class HeaderPage implements OnInit {
    @Input() title: string ;
    constructor(public nav: NavController) {
        
    }
    ngOnInit() {
        
    }

}