import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from "rxjs";
import { AlertController } from 'ionic-angular';

@Injectable()

export class StorageService {
    constructor(
        private Storage: Storage,
        private alertCtrl: AlertController) {
    }
    public GetStorage(key: string): Observable<any> {
        return Observable.create((observer) => {
            observer.next(this.Storage.get(key))
        })
        // this.Storage.get(key).then((val) =>{
        //     return val
        // }) 

    }
    public SetStorage(key: string, val: any) {
        if (val) {
            JSON.stringify(val)
            this.Storage.set(key, val)
        }


    }
    public RemoveStorage(key: string) {
        return this.Storage.remove(key).then((val) => {
            if (this.GetStorage(val)) {
                let alert = this.alertCtrl.create({
                    title: '退出成功!',
                    buttons: ['OK'],
                    cssClass:"outsuccse only"
                });
                alert.present();
            }
        })
    }
}