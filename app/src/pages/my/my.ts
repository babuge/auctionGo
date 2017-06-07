import { Component } from '@angular/core';
import { NavController,PopoverController,App } from 'ionic-angular';
import {barrageModel} from '../../model/barrageModel';
import {PopoverPage} from '../mypopover/mypopover';
import {LoginPage} from '../login/login';

@Component({
  selector: 'page-my',
  templateUrl: 'my.html'
})
export class MyPage {

  constructor(public navCtrl: NavController,public popoverCtrl:PopoverController,public appCtrl:App) { }

//覆盖层
popover(ev){
    let option={
       cssClass: 'popoverCss',
    // showBackdrop: true,
    enableBackdropDismiss:true
    }
    let popover = this.popoverCtrl.create(PopoverPage, {
      // 'contentEle': this.content.nativeElement,
      // textEle: this.text.nativeElement
    },option);

    popover.present({
      ev: ev
    });
  
}

//go to Login
toLogin(){
  this.appCtrl.getRootNav().push(LoginPage);
}
}
