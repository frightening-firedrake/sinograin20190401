import { Component,Input } from "@angular/core";
import { NavController } from 'ionic-angular';

@Component({
    selector:"login-header",
    templateUrl:"login_header.html"
})

export class LoginHearderPage {
    @Input() title:string;
}