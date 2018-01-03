import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable, Subscription,Subject } from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HomeService {
    headers: Headers;
    requestOptions: RequestOptions;
    private subject = new Subject<any>()
    constructor(
        private http: Http,
    ) {
        this.headers = new Headers({'X-Requested-With': 'XMLHttpRequest'});
        this.requestOptions = new RequestOptions({ headers: this.headers});
    }
    getHomeList(){
       return this.http.get('http://coalapp.smmeitan.cn:8900/app/news/getDailyNewsList?pageNumber=0')
       .toPromise()
       .then(res =>res.json())
       .catch(req => console.log("错误"))
    // return Observable.create((observer)=>{
    //     observer.next(this.http.get("http://coalapp.smmeitan.cn:8900/app/news/getDailyNewsList?pageNumber=0")
    //     .toPromise()
    //     .then(response => response.json()
    //     ))
    // })
    
    }
    // rxjs的
    // send(message: any){
    //     this.subject.next(message)
    // }
    // get():Observable<any>{
    //     // console.log(arguments)
    //      return this.subject.asObservable();
    // }
}