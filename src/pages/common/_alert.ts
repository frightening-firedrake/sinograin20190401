import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
declare var $;
@Injectable()

export class _alertBomb {
    constructor(public _alert: AlertController, ) {

    }
    //  var parpam = {
    //                 title: "提示",
    //                 subTitle: "用户名或密码错误",
    //                 buttons: [
    //                     {
    //                         text: "确认",
    //                         handler: () => {

    //                         }
    //                     }
    //                 ],
    //                 cssClass: "outsuccse only"
    // cssClass: "outsuccse succse" 文字多的时候
    //             }
    //             var addbuton = {
    //                 text: null
    //             }
    //             var addInput = []
    //             this._alert._alertSmlpe(parpam, addbuton, addInput, function (data) { })
    //         }  单纯的弹出框
    //addInput是单选框每一个选项

    _alertSmlpe(parpam, addButton: any = null, addInput: any = null, callback) {
        let $alert = this._alert.create({
            title: parpam.title,
            message: parpam.message,
            subTitle: parpam.subTitle,
            buttons: parpam.buttons,
            cssClass: parpam.cssClass,
            enableBackdropDismiss: false,
            inputs: parpam.inputs
        });
        if (addInput.length || addInput) {
            $(addInput).each(function (i, v) {
                v.handler = function (data) {
                    $alert.dismiss()
                    callback(data)
                }
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