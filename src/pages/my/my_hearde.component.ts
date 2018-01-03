import { Component,Input } from '@angular/core';


@Component({
    selector:"my-hearde",
    templateUrl:"my_hearde.component.html"
})

export class MyHeardePage {
    @Input() title:string;
}