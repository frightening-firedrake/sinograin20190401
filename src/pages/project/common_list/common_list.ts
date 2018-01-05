import { Component,Input } from '@angular/core';

@Component({
    selector:"common-list",
    templateUrl:"./common_list.html"
})

export class CommonList{
    @Input() pos:any;
    constructor(){
        
    }
}