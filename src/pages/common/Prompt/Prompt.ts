import { Component, OnInit, Input } from '@angular/core';

@Component({
    templateUrl:"./Prompt.html",
    selector:"prompt"
})

export class promptPage{
    @Input() promptObj:object;
    constructor(){
        
    }
}