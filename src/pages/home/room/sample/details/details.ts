import { Component } from "@angular/core";
import { NavParams } from "ionic-angular"

@Component({
    selector:"sampleDeatils",
    templateUrl:"details.html"
})
export class SampleDetailsPage{
    constructor(
        private params:NavParams
    ){
        // this.params.get("sample")
    }
}