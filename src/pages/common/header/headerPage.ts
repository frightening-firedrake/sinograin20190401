import { Component, OnInit, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpService } from '../../../providers/httpService'


@Component({
    selector: 'app-header',
    templateUrl: 'headerPage.html'
})
export class HeaderPage implements OnInit {
    @Input() title: string;
    constructor(public nav: NavController, public Http: HttpService) {
        this.Http.post("grain/sample/getAllCereals").subscribe(res => {
            if (res.json()["code"] == "1000000") {
                this.nav.popToRoot()
            }
        })
    }
    ngOnInit() {

    }
}