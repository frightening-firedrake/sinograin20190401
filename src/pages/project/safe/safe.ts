import { Component } from '@angular/core';
import { NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
    selector: "safe_speech",
    templateUrl: "./safe.html"
})

export class safePage {
    data: any;
    loginForm: any;
    lists=[1]
    constructor(
        public params: NavParams,
        public Alert: ActionSheetController,
        public alertCtrl: AlertController,
        public FormBuilder: FormBuilder,
        public camera: Camera, ) {
        this.data = this.params.get('json');


    }
    keyoff(event,index){
        console.log(event.srcElement.value,index)
    }
    add(){
        this.lists.push(1)
    }
    onSubmit(e) {
        console.log(e)
    }
}