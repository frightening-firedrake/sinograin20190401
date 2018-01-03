import { Component, EventEmitter,Input,Output } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController,NavController } from 'ionic-angular';
import { StorageService } from '../../../../providers/locationstorageService';

import { MyHeardePage } from '../../my_hearde.component';

@Component({
    selector:"photo-url",
    templateUrl:"./photo.component.html"
})

export class UserPhotoPage{
    private imageData: string;
    @Input("useURI") useURI: boolean = true;
    constructor(
        public camera: Camera,
        private alert: AlertController,
        private nav: NavController,
        private Storage: StorageService
    ) { }
    getphoto(){
        if(this.imageData){
            this.Storage.SetStorage("UserImg",this.imageData)       
            this.nav.pop()
        }
    }
    
    getPicture(sourceType) {
        this.camera.getPicture({
            quality: 50,
            allowEdit: true,
            encodingType: this.camera.EncodingType.JPEG,
            saveToPhotoAlbum: false,
            destinationType: this.useURI?this.camera.DestinationType.FILE_URI:this.camera.DestinationType.DATA_URL,
            targetHeight: 800,
            targetWidth: 800,
            sourceType: sourceType,
        }).then((imageData) => {
           if(this.useURI){
            
               this.imageData = imageData
           }else{
               this.imageData = "data:image/jpeg;base64," + imageData
           }
        }, (err) => {
           let alert = this.alert.create({
                title: "内容",
                subTitle:err,
                buttons: ['OK']
            });
            alert.present();
        })
    }
}