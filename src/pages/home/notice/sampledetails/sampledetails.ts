import { Component } from "@angular/core";
import { NavParams } from "ionic-angular";

@Component({
    selector:"sampledetails",
    templateUrl:"./sampledetails.html"
})

export class sampleDetailsPage{
    private _params;
    constructor(
        private params: NavParams
    ){
        this._params = this.params.get("json")
    }
}