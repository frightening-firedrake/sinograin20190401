import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HomeService } from '../../home/home.serve'

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
    selector: "safe_speech",
    templateUrl: "./safe.html"
})

export class safePage {
    data: any;
    gender: any;
    loginForm: any;
    lists = [1]
    keyVule: any = [];
    constructor(
        public params: NavParams,
        public FormBuilder: FormBuilder,
        public camera: Camera,
        public Home: HomeService,
        public ble: BLE
    ) {
        this.data = this.params.get('json');
        this.gender = this.params.get("newpage")
    }
    ionViewCanLeave() {
        this.Home.setgender(this.gender)
    }
    keyoff(event, index) {
        this.keyVule[index] = event.srcElement.value
    }
    add() {
        if (this.keyVule[this.lists.length - 1]) {
            this.lists.push(1)
        }

    }
    onSubmit(e) {
        console.log(e)
    }
    _ble() {
        this.ble.enable().then(res => {
            console.log(res)
            this.ble.showBluetoothSettings().then(res => {
                this.ble.scan([], 10).subscribe(res => {
                    console.log(111)
                    console.log(res.id)
                    this.ble.connect(res.id).subscribe(res=>{
                        console.log(res)
                    })
                    //     //    var adData = new Uint8Array(res.advertising)
                    //     //    console.log(adData)
                })
            })

        })

    }
}