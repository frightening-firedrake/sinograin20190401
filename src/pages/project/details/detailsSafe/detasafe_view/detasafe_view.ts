import { Component,Input,Output,EventEmitter } from '@angular/core';
import { ActionSheetController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
    selector: "detasafe-view",
    templateUrl: "./detasafe_view.html"
})

export class detasafeViewPage {
    imgdatalist=[]
     @Input() num;
     @Output() key = new EventEmitter()
   constructor(
        public Alert: ActionSheetController,
        public alertCtrl: AlertController,
        public camera: Camera, ) {
            
    }
    lists = {
        label:"问题",
        textarea:""
    }
    even(event){
        this.key.emit(event)
    }
    cancel(index){
        let AlertSheetcancl = this.Alert.create({
            title:null,
            buttons:[
                {
                    text:"删除",
                    handler:()=>{
                        this.imgdatalist = this.imgdatalist.filter(function(i,v){
                            return index!=v
                        })
                        console.log(this.imgdatalist)
                    }
                }
            ]
        }) 
          AlertSheetcancl.present();
    }
    getphone() {
        let AlertSheet = this.Alert.create({
            title: null,
            buttons: [
                {
                    text: "拍照",
                    handler: () => {
                        this.camera.getPicture({
                            quality: 50,
                            allowEdit: true,
                            encodingType: this.camera.EncodingType.JPEG,
                            saveToPhotoAlbum: false,
                            // destinationType: this.useURI ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
                            targetHeight: 800,
                            targetWidth: 800,
                            sourceType: 1,
                        }).then((imageData) => {
                            this.imgdatalist.push(imageData)
                        }, (err) => {

                            // let alert = this.alertCtrl.create({
                            //     title: 'New Friend!',
                            //     subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
                            //     buttons: ['OK']
                            // });
                            // alert.present();
                        })
                    }
                },
                {
                    text: "从相册选取",
                    handler: () => {
                        this.camera.getPicture({
                            quality: 50,
                            allowEdit: true,
                            encodingType: this.camera.EncodingType.JPEG,
                            saveToPhotoAlbum: false,
                            // destinationType: this.useURI ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
                            targetHeight: 800,
                            targetWidth: 800,
                            sourceType: 0,
                        }).then((imageData) => {
                            this.imgdatalist.push(imageData)
                        }, (err) => {
                            // let alert = this.alertCtrl.create({
                            //     title: "内容",
                            //     subTitle: err,
                            //     buttons: ['OK']
                            // });
                            // alert.present();
                        })
                    }
                }
            ]
        })
        AlertSheet.present();
    }

}