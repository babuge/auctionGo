import { Component,ViewChild } from '@angular/core';
import { Platform ,ToastController,Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StorageService } from '../providers/storageService';
import {WwwName} from '../model/WwwName';
import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {WelcomePage} from '../pages/welcome/welcome';
declare var screen :any;
@Component({
  template: '<ion-nav [root]="rootPage" #Nav></ion-nav>'
})
export class MyApp {
  @ViewChild('Nav') nav: Nav;
  rootPage:any;
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  // mun:number;
  constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private toastCtrl:ToastController,public storage:StorageService, wwwname:WwwName,) {
     
    platform.ready().then(() => {
      this.storage.write("login","TRUE");
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      // Keyboard.disableScroll(true);
      if(this.storage.read("FristIn")==null){
        this.rootPage=WelcomePage;   
        }else{
          this.rootPage=TabsPage;
      }
      setTimeout(then=>{splashScreen.hide();},1000);
      screen.orientation.lock('portrait-primary');
//     //锁定到主竖屏
//     screen.orientation.lock('portrait-primary');
//     //  //只禁止横屏
//      screen.orientation.lock('landscape');
//     //  //只禁止竖屏
//      screen.orientation.lock('portrait');
//     // //锁定到副竖屏
//     // screen.orientation.lock('portrait-secondary');
//     // //锁定到主横屏
//     // screen.orientation.lock('landscape-primary');
//     // //锁定到副横屏
//     // screen.orientation.lock('landscape-secondary');
//     // //解除屏幕锁定
//     // screen.orientation.unlock();
        platform.registerBackButtonAction(():any=>{
        let activeVC = this.nav.getActive();
        let page = activeVC.instance;
        let logined=storage.read("login");        
          if (!logined) {
            //当前页面为loginpage，退出APP
            return this.showExit();
          }
        if (!(page instanceof TabsPage)) {
            if (!this.nav.canGoBack()) {
            //当前页面为tabs，退出APP
              return this.showExit();
            }
            //当前页面为tabs的子页面，正常返回
            return this.nav.pop();
        }
        let tabs = page.tabs;
        let activeNav = tabs.getSelected();
        if (!activeNav.canGoBack()) {
          //当前页面为tab栏，退出APP
          return this.showExit();
        }
        //当前页面为tab栏的子页面，正常返回
        return activeNav.pop();
      }, 100);
      });
  }
  //双击退出提示框，这里使用Ionic2的ToastController
  showExit() {
    if (this.backButtonPressed){
      this.platform.exitApp(); //当触发标志为true时，即2秒内双击返回按键则退出APP
    }else {
      let toast = this.toastCtrl.create({
        message: '再按一次退出应用',
        cssClass:"toastCss",
        duration: 1500,
        position: 'bottom'
      });
      toast.present();
      this.backButtonPressed = true;
      //2秒内没有再次点击返回则将触发标志标记为false
      setTimeout(() => {
        this.backButtonPressed = false;
      }, 1500)
    }
  }




    
  
}
