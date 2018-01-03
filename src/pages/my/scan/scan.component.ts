import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { BarcodeScanner } from "@ionic-native/barcode-scanner";

import { MyHeardePage } from '../my_hearde.component';

@Component({
    templateUrl: "scan.component.html"
})

export class ScanPage {
    public scannedText: string;
    constructor(public BarcodeScanner: BarcodeScanner, public alert: AlertController) {

    }
    public scan() {
        this.BarcodeScanner.scan().then((barcodeData) => {
            if (barcodeData.cancelled) {
                console.log("User cancelled the action!");
                return false;
            }
            console.log("Scanned successfully!");
            console.log(barcodeData);
            this.scannedText = JSON.stringify(barcodeData);
            let alert = this.alert.create({
                title: "内容",
                subTitle:this.scannedText,
                buttons: ['OK']
            });
            alert.present();
        }, (err) => {
            console.log(err);
        });
    }
}