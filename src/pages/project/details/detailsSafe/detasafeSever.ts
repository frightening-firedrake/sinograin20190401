import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable()

export class dateSafeServe {
    public imgarr = []
    public num = 1
    public setImg(arr, num) {
        if (arr.length) {
            if (num - 1 < this.imgarr.length) {
                // console.log( this.imgarr)            
                this.imgarr[num - 1].Imgarr = arr
            } else {
                this.imgarr.push({ "id": num, "Imgarr": arr })
                this.num = num
                // console.log( this.imgarr)            
            }
        }else{
            this.imgarr = []
        }
    }
    public getImg(): Observable<any> {
        return Observable.create((observer) => {
            observer.next(this.imgarr)
        })
    }
    public deleteImg(arr, num) {
        this.imgarr[num - 1].Imgarr = this.imgarr[num - 1].Imgarr.filter((i, v) => {
            return v != arr
        })
        // this.imgarr[num].slice(this.imgarr[num].Imgarr[arr],1)
    }
}