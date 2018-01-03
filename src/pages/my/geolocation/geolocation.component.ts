import { Component, ViewChild } from "@angular/core";
import { LoadingController } from 'ionic-angular';

import { MyHeardePage } from '../my_hearde.component';
declare var AMap;
@Component({
    templateUrl: "geolocation.component.html"
})

export class geolocationPage {
    position: any;
    position_location: any;
    constructor(
        public Loading: LoadingController
    ) {
    }

    getlocation() {
        // let loader = this.Loading.create({
        //     content: "正在定位，请稍后...",
        // });
        // loader.present();
        this.position = new AMap.Map('container', {
            zoom: 16,
        });
        let loadCtrl = this.Loading
        let position_location_r = this.position_location
        let position_r = this.position
        this.position.plugin('AMap.Geolocation', function () {
            position_location_r = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                GeoLocationFirst: true,   //优先使用浏览器定位，不行就用ip定位
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(0, 0),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                useNative: true,          //是否使用安卓定位sdk用来进行定位
                zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            position_r.addControl(position_location_r);
            position_location_r.getCurrentPosition(function (status, result) {
                console.log(result)
                if (result.status != 0) {
                    var markers = [];   //provinces见Demo引用的JS文件
                    let marker = new AMap.Marker({
                        position: [result.position.lng, result.position.lat],
                        offset: new AMap.Pixel(0, 0),
                        map: position_r
                    });
                    markers.push(marker);
                } else {
                    let loader = loadCtrl.create({
                        content: "定位失败",
                        duration: 2000
                    });
                    loader.present();
                }
                //    loader.dismiss();
            });
            AMap.event.addListener(position_location_r, 'complete');//返回定位信息
            AMap.event.addListener(position_location_r, 'error');      //返回定位出错信息
        });
    }

    ionViewDidEnter() {
        this.getlocation()

    }
}