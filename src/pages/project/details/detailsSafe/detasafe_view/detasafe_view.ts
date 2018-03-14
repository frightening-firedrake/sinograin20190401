import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpService } from '../../../../../providers/httpService'
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
// import { Transfer } from "ionic-native";
import { dateSafeServe } from '../detasafeSever'

@Component({
    selector: "detasafe-view",
    templateUrl: "./detasafe_view.html",
})

export class detasafeViewPage {
    imgdatalist = []
    imgdata = []
    imageNum;
    @Input() num;
    @Input() default
    @Output() key = new EventEmitter()
    constructor(
        public Alert: ActionSheetController,
        public alertCtrl: AlertController,
        public camera: Camera,
        public dateser: dateSafeServe,
        public Http: HttpService,
        // private transfer: FileTransfer,
    ) {
        
    }
    lists = {
        label: "问题",
        textarea: ""
    }
    even(event) {
        this.key.emit(event)
    }

    GetImgUrl(Url, callback) {
        let data = {
            pictureFile: Url
        }
        // const fileTransfer: FileTransferObject = this.transfer.create();
        // fileTransfer.upload(Url, this.Http.encode(Url)).then(res=>{
        //     console.log(res)
        // })

        this.Http.post("grain/safetyReport/uploadBase64", data).subscribe(res => {
            callback(res.json()["msg"])
        })
    }
    cancel(index) {
        let AlertSheetcancl = this.Alert.create({
            title: null,
            buttons: [
                {
                    text: "删除",
                    handler: () => {
                        var that = this
                        console.log(that.imgdatalist,that.num,that.default)
                        this.imgdatalist = this.imgdatalist.filter(function (i, v) {
                            that.dateser.deleteImg(index, that.num-that.default)
                            return v != index
                        })
                        // console.log(this.imgdatalist)
                    }
                }
            ]
        })
        AlertSheetcancl.present();
    }
    getphone() {
        console.log(this.num-this.default)
        let AlertSheet = this.Alert.create({
            title: null,
            buttons: [
                {
                    text: "拍照",
                    handler: () => {
                        this.camera.getPicture({
                            quality: 50,
                            // allowEdit: true,
                            encodingType: this.camera.EncodingType.JPEG,
                            saveToPhotoAlbum: false,
                            destinationType: 1,
                            targetHeight: 800,
                            targetWidth: 800,
                            sourceType: 1,
                        }).then((imageData) => {
                            
                            // imageData是图片
                            var that = this
                            // this.GetImgUrl(imageData, data => {
                            // this.imgdatalist.push("data:image/jpeg;base64,"+imageData)
                            // console.log(imageData, "data:image/jpeg;base64," + imageData)
                            //     this.dateser.setImg(data,this.num)
                            // })
                            var img = imageData;
                            var image = new Image();
                            image.src = img;
                            image.onload = function () {
                                var base64 = that.getBase64Image(image);
                                that.GetImgUrl(base64, (data) => {
                                    that.imgdatalist.push(imageData)
                                    that.imgdata.push(data)
                                    that.dateser.setImg(that.imgdata, that.num-that.default)
                                })
                            }
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
                            // allowEdit: true,
                            encodingType: this.camera.EncodingType.JPEG,
                            saveToPhotoAlbum: false,
                            // destinationType: this.useURI ? this.camera.DestinationType.FILE_URI : this.camera.DestinationType.DATA_URL,
                            destinationType: 1,
                            targetHeight: 800,
                            targetWidth: 800,
                            sourceType: 0,
                        }).then((imageData) => {
                            var that = this
                            var img = imageData;
                            var image = new Image();
                            image.src = img;
                            image.onload = function () {
                                var base64 = that.getBase64Image(image);
                                console.log(base64)
                                that.GetImgUrl(base64, (data) => {
                                    that.imgdatalist.push(imageData)
                                    that.imgdata.push(data)
                                    that.dateser.setImg(that.imgdata, that.num-that.default)
                                })
                            }
                            // this.GetImgUrl(imageData, data => {
                            //     this.imgdatalist.push("data:image/jpeg;base64,"+data)
                            //     this.dateser.setImg(data,this.num)
                            // })
                            // this.dateser.setImg(this.imgdatalist,this.num)
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
    getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
        var dataURL = canvas.toDataURL("image/jpeg" + ext);
        var index = dataURL.indexOf(",")
        var dateURLTO = dataURL.slice(index+1)
        console.log(index,dataURL)
        return dateURLTO;
    }

}