import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HomeService } from '../../../home/home.serve'
import { _alertBomb } from '../../../common/_alert'
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
    selector: "detailsSafe",
    templateUrl: "./detailsSafe.html"
})

export class detaSafePage {
    lists = [1]
    keyVule: any = [];
    detaSafeForm: FormGroup;
    data;
    constructor(public params: NavParams,
        public FormBuilder: FormBuilder,
        public camera: Camera,
        public Home: HomeService,
        public _alert: _alertBomb) {
        this.data = this.params.get("params")
        this.detaSafeForm = FormBuilder.group({

        })
    }
    keyoff(event, index) {
        this.keyVule[index] = event.srcElement.value
    }
    add() {
        if (this.keyVule[this.lists.length - 1]) {
            this.lists.push(1)
        }
    }
    remove() {
        this.lists.pop()
    }
    onSubmit(e) {
        console.log(this.keyVule)
    }
}