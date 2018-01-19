import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
declare var $;
@Injectable()

export class _alertBomb {
    constructor(public _alert: AlertController, ) {

    }
    _alertSmlpe(parpam, addButton, addInput, callback) {
        let $alert = this._alert.create({
            title: parpam.title,
            message:parpam.message,
            subTitle: parpam.subTitle,
            buttons: parpam.buttons,
            cssClass:parpam.cssClass
        });
        if (addInput.length||addInput) {
            $(addInput).each(function (i, v) {
                $alert.addInput(v);
            })
        }

        if (addButton.text) {
            // $alert.addInput(addInput);
            $alert.addButton({
                text: addButton.text,
                handler: data => {
                    callback(data)
                }
            })
        }

        $alert.present();
    }
}