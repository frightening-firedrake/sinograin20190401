import { Component } from "@angular/core";
import { NavParams } from "ionic-angular"

@Component({
    selector:"code",
    templateUrl:"./code.html"
})

export class codePage{
    codenumber;
    constructor(
        private params: NavParams
    ){
        this.codenumber = this.params.get("codenumber")
    }
}