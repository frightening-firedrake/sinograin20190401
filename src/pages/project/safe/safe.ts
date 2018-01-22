import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { HomeService } from '../../home/home.serve'

import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
    selector: "safe_speech",
    templateUrl: "./safe.html"
})

export class safePage {
    data: any;
    gender:any;
    loginForm: any;
    lists=[1]
    keyVule:any=[];
    constructor(
        public params: NavParams,
        public FormBuilder: FormBuilder,
        public camera: Camera,
        public Home:HomeService ) {
        this.data = this.params.get('json');
        this.gender = this.params.get("newpage")
    }
     ionViewCanLeave() {
        this.Home.setgender(this.gender)
    }
    keyoff(event,index){
        this.keyVule[index] = event.srcElement.value
    }
    add(){
        // console.log(this.keyVule)
        if(this.keyVule[this.lists.length-1]){
            this.lists.push(1)
        }

    }
    onSubmit(e) {
        console.log(e)
    }
}