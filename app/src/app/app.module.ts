import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyApp } from './app.component';

import {WelcomePage} from '../pages/welcome/welcome';
import { InfoPage } from '../pages/Info/Info';
import { MyPage } from '../pages/my/my';
import { AuctionPage } from '../pages/auction/auction';
import { TabsPage } from '../pages/tabs/tabs';
import {PopoverPage} from '../pages/mypopover/mypopover';
import {BiddingPage} from '../pages/bidding/bidding';
import {goodsListPage} from '../pages/goodsList/goodsList';
import {LoginPage} from '../pages/login/login';
import {registerPage} from '../pages/register/register';
import {forgetPage} from '../pages/forget/forget';

import {BarragePage} from '../pages/barrage/barrage';

import {TabsServer  } from '../providers/tabs-server';
import {StorageService} from '../providers/storageService';
import {HttpServer} from '../providers/http-server';
import {CanvasService} from '../providers/canvasServer';

import {HomeModel} from '../model/Home-model';
import {barrageModel} from '../model/barrageModel';
import {WwwName} from '../model/WwwName';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    InfoPage,
    MyPage,
    AuctionPage,
    TabsPage,
    PopoverPage,
    BiddingPage,
    goodsListPage,
    LoginPage,
    registerPage,
    forgetPage,
    BarragePage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
    // popEnter: 'modal-slide-in',
    // modalLeave: 'modal-slide-out',
    popoverEnter:'popover-md-pop-in',
    popoverLeave:'popover-pop-out',
    tabsHideOnSubPages:'true'
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    InfoPage,
    MyPage,
    AuctionPage,
    TabsPage,
    PopoverPage,
    BiddingPage,
    goodsListPage,
    LoginPage,
    registerPage,
    forgetPage,
    BarragePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler,useClass: IonicErrorHandler},
    WwwName,barrageModel,TabsServer,HomeModel,StorageService,HttpServer,CanvasService
  ]
})
export class AppModule {}
