import { Component } from '@angular/core';

import {NavParams, ViewController,ActionSheetController } from 'ionic-angular';


@Component({
  selector:'goodsList-page',
  templateUrl: 'goodsList.html'
})
export class goodsListPage {
 constructor(public action:ActionSheetController){}
//  ionViewDidEnter(){
//    this.show();
//  }
//  show(){
//     //    setModeConfig(modeName: string, modeConfig: any): void;
//     // /**
//     //  * @hidden
//     //  */
//     // getModeConfig(modeName: string): any;
//    this.action.config.setTransition('actionSheetEnter', "boottom");
//     /**
//      * @hidden
//      */
//  }
}