import { Component,ViewChild } from '@angular/core';

import { InfoPage } from '../Info/Info';
import { MyPage } from '../my/my';
import { AuctionPage } from '../auction/auction';
import {WwwName} from '../../model/WwwName';
import {StorageService} from "../../providers/storageService";
import {LoginPage} from '../../pages/login/login';

import {Tabs,App} from 'ionic-angular';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
    @ViewChild('mainTabs') tabs:Tabs;
  tab1Root = AuctionPage;
  tab2Root = InfoPage;
  tab3Root = MyPage;
public fristComeInnum:number=this.wwwname.fristComeInNum();
 constructor(public appCtrl:App,public storage:StorageService,public wwwname:WwwName){
  }

  toLogin(){
    if(!this.storage.read("UserId")){
        this.appCtrl.getRootNav().push(LoginPage);      
    }
  }

}
