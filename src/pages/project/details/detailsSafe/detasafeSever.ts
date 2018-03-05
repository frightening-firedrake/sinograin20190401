import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable()

export class dateSafeServe{
    public imgarr = []
    public setImg(arr,num){
        this.imgarr.push({"id":num,"arr":arr})
    }
    public getImg():Observable<any>{
        return Observable.create((observer) => {
            observer.next(this.imgarr)
        })
    }
    public deleteImg(arr,num){
        this.imgarr.slice(this.imgarr[num].arr[arr],1)
    }
}