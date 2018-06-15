import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@Component({
    selector: "transfer",
    templateUrl: "./transfer.html"
})

export class transferPage {
    private sample;
    constructor(
        private params: NavParams,
        private barcode:BarcodeScanner
    ) {
        this.sample = this.params.get("sample")
    }
    getbarcode() {
        this.barcode.scan().then(barcodeData => {
            console.log(barcodeData)
            if (barcodeData.cancelled) {
                console.log("User cancelled the action!");
                return false;
            } else {
               
            }
        }).catch(err => {

        });
    }
}