import { Component } from "@angular/core";

import { _alertBomb } from '../common/_alert'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
    selector:"login",
    templateUrl:"./login.html"
})

export class loginPage{
    constructor(public _alert:_alertBomb,  public FormBuilder: FormBuilder,){
        
    }
}