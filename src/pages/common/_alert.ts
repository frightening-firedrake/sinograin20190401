import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()

export class _alertBomb {
    constructor(public _alert: AlertController, ) {

    }
    _alertSmlpe(title: any, subTitle: any, buttons) {
        let $alert = this._alert.create({
            title: title,
            subTitle:subTitle ,
            buttons: buttons
        });
        $alert.present();
    }
}