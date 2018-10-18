
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams, RequestOptionsArgs, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs";
import { Utils } from "./Utils";
import { GlobalData } from "./globalData";
import { NativeService } from "./nativeService";
import { AlertController, ModalController } from "ionic-angular";
import { APP_SERVE_URL } from "./config";
import { StorageService } from './locationstorageService';
import { _alertBomb } from '../pages/common/_alert'
import { loginPage } from '../pages/login/login'

@Injectable()
export class HttpService {
  private flag = true;
  constructor(public http: Http,
    private globalData: GlobalData,
    private nativeService: NativeService,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    public Storage: StorageService,
    public _alert: _alertBomb) {
  }
  public encode(url) {
    return encodeURI(url)
  }
  private _token: string;
  public request(url: string, options: RequestOptionsArgs): Observable<Response> {
    url = HttpService.replaceUrl(url);
    // return this.http.request(url,options);
    return Observable.create((observer) => {
      this.nativeService.showLoading();
      this.Storage.GetStorage("userLogin").subscribe(res => {
        res.then(res => {
          // console.log(`http${JSON.stringify(res)}`)
          // console.log(res==null)
          if (res) {
            this._token = res.token;
            if (options.headers) {
              options.headers.append('Authorization', this._token);
            } else {
              options.headers = new Headers({
                'Authorization': this._token
              });
            }
            // console.log(options)
          }
          this.http.request(url, options).subscribe(res => {
            this.nativeService.hideLoading();
            // if (res.json()["code"] == "1000000") {

            //   // let profile = this.modalCtrl.create(loginPage);
            //   // profile.present();
            // }
            // console.log('%c 请求成功 %c', 'color:green', '', 'url', url, 'options', options, 'res', res);
            observer.next(res);
          }, err => {
            this.requestFailed(url, options, err);//处理请求失败
            observer.error(err);
          });
        })
      })
      // console.log('%c 请求前 %c', 'color:blue', '', 'url', url, 'options', options);
    });

  }

  public get(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Get,
      search: HttpService.buildURLSearchParams(paramMap)
    }));
  }

  public post(url: string, body: any = null): Observable<Response> {
    body = HttpService.transformRequest(body)
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      body: body,
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      })
    }));
  }

  public postFormData(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Post,
      search: HttpService.buildURLSearchParams(paramMap).toString(),
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    }));
  }

  public put(url: string, body: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Put,
      body: body
    }));
  }

  public delete(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Delete,
      search: HttpService.buildURLSearchParams(paramMap).toString()
    }));
  }

  public patch(url: string, body: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Patch,
      body: body
    }));
  }

  public head(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Head,
      search: HttpService.buildURLSearchParams(paramMap).toString()
    }));
  }

  public options(url: string, paramMap: any = null): Observable<Response> {
    return this.request(url, new RequestOptions({
      method: RequestMethod.Options,
      search: HttpService.buildURLSearchParams(paramMap).toString()
    }));
  }

  /**
   * 将对象转为查询参数
   * @param paramMap
   * @returns {URLSearchParams}
   */
  private static buildURLSearchParams(paramMap): URLSearchParams {
    let params = new URLSearchParams();
    if (!paramMap) {
      return params;
    }
    for (let key in paramMap) {
      let val = paramMap[key];
      if (val instanceof Date) {
        val = Utils.dateFormat(val, 'yyyy-MM-dd hh:mm:ss')
      }
      params.set(key, val);
    }
    return params;
  }

  /**
   * 处理请求失败事件
   * @param url
   * @param options
   * @param err
   */
  private requestFailed(url: string, options: RequestOptionsArgs, err) {
    this.nativeService.hideLoading();
    // console.log('%c 请求失败 %c', 'color:red', '', 'url', url, 'options', options, 'err', err);
    let msg = "", status = err.status;
     if (!this.nativeService.isConnecting()) {
      msg = '请求失败，请连接网络';
    } else {
      if (status === 0) {
        msg = '请求失败,错误代码:0';
      } else if (status === 404) {
        msg = '请求失败,错误代码:404';
      } else if (status === 500) {
        msg = '请求失败,错误代码:500';
      }else {
        msg = '连接异常，请刷新'
      }
    }
    this.alertCtrl.create({
      title: "提示",
      subTitle: msg,
      buttons: [
        {
          text: "确认",
          handler: () => {

          }
        }
      ],
      cssClass: "outsuccse only"
    }).present();

  }

  /**
   * url中如果有双斜杠替换为单斜杠
   * 如:http://88.128.18.144:8080//api//demo.替换后http://88.128.18.144:8080/api/demo
   * @param url
   * @returns {string}
   */
  private static replaceUrl(url) {
    if (url.indexOf('http://') == -1) {
      url = APP_SERVE_URL + url;
    }
    return 'http://' + url.substring(7).replace(/\/\//g, '/');
  }
  /**
   *post请求中的参数序列化，使其成为formdata
   */
  private static transformRequest(data) {
    var str = [];
    for (var p in data)
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
    return str.join("&");
  }

}
