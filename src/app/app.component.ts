import { Component,ViewChild } from '@angular/core';
import { Platform,Keyboard, ToastController,Nav  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeService } from '../providers/nativeService'

import { TabsPage } from '../pages/tabs/tabs';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  @ViewChild('myNav') nav: Nav;
   backButtonPressed: boolean = false;
  constructor(
    public platform: Platform,
    geolocation: Geolocation, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public Keyboard:Keyboard,
    public toastCtrl: ToastController,
    public nativeService:NativeService
    ) {
     
    platform.ready().then(() => {

      // get current position
      // geolocation.getCurrentPosition().then(pos => {
      //   console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      // });

      // const watch = geolocation.watchPosition().subscribe(pos => {
      //   console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      // });

      // to stop watching
      // watch.unsubscribe();
      statusBar.styleDefault();
      splashScreen.hide();
      this.registerBackButtonAction();//注册返回按键事件
    });
    
  }
  registerBackButtonAction() {
    
    
     this.platform.registerBackButtonAction(()=>{
      
       if(this.Keyboard.isOpen()){
         this.Keyboard.close()
         return
       }
      let tabs = this.nav.getActiveChildNav();//获取tabs导航,this.nav是总导航,tabs是子导航
      let tab = tabs.getSelected();//获取选中的tab
      let activeVC = tab.getActive();//通过当前选中的tab获取ViewController
      let activeNav = activeVC.getNav();//通过当前视图的ViewController获取的NavController
      console.log(tabs,tab,activeVC,activeNav)
       console.log(this.nativeService.hideLoading())
       this.nativeService.hideLoading()
      return activeNav.canGoBack() ? activeNav.pop() :  this.showExit();//this.showExit()
     })
   }
   
  //双击退出提示框
  showExit() {
    
    
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
         message: '再按一次退出应用',
         duration: 2000,
         position: 'bottom'
       }).present();
      this.backButtonPressed = true;
      setTimeout(() => { //2秒内没有再次点击返回则将触发标志标记为false
        this.backButtonPressed = false;
      }, 2000)
    }
  }
}

