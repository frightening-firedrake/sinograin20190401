import { Component } from '@angular/core';

@Component({
    templateUrl: 'forget.html'
})
export class ForgetPage {
    Mytitle: string;
    constructor() {
      this.Mytitle = "找回密码";
    }
}