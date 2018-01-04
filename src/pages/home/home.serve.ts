import { Injectable } from "@angular/core";
import { Observable, Subscription,Subject } from 'rxjs';

@Injectable()
export class HomeService {
    gendersclass:any = "";
    constructor() {}
    getgenders(): Observable<any>{
        return  Observable.create((observer)=>{
            observer.next(this.gendersclass)
        })    
    }
    setgender(parpam){
        this.gendersclass = parpam
    }
}