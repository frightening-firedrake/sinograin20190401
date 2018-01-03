import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DepartmentContentPage } from './view/department_view';


@Component({
    templateUrl: 'department.html'
})
export class DepartmentPage {
    constructor(private nav: NavController ) {
       
    }
    gotocontent() {
        
        this.nav.push(DepartmentContentPage);
    }
}