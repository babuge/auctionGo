import { Component, ElementRef,ViewChild } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser'
import { NavController,NavParams,PopoverController,App} from 'ionic-angular';
import {WwwName} from '../../model/WwwName';
import {TabsServer} from '../../providers/tabs-server';
import { StorageService } from '../../providers/storageService';

import {PopoverPage} from '../mypopover/mypopover';
import {BiddingPage} from '../bidding/bidding';
import {barrageModel} from '../../model/barrageModel';
import {goodsListPage} from '../goodsList/goodsList';
import {LoginPage} from '../login/login';

import {BarragePage} from '../barrage/barrage';
@Component({
  selector: 'page-auction',
  templateUrl: 'auction.html'
})
export class AuctionPage {
  @ViewChild('sketchElement') sketchElement:ElementRef;
  // @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;
  // @ViewChild('barrageBar') barragebar:ElementRef;
  //  @ViewChild('popoverText', { read: ElementRef }) text: ElementRef; 
  private tipShowBar:boolean=true;wwwImg:string="";tipCont:any;radomH:any=[10,30,50,70,90,110,130];setInt:any=null;
  private showRule1:boolean=true;showRule2:boolean=false;showRule3:boolean=false;showGdsInfo:boolean=false;
  private bardom:any;runnum:any=0;newarr=[];timer=null;renum:number=0;showBackdrop:boolean=false;popovershow:boolean=true;
  private showRulePage:boolean=false;
  constructor(public navCtrl: NavController,public wwwname:WwwName,public popoverCtrl:PopoverController,
  public tabsserver:TabsServer,public barrages:barrageModel,public storage:StorageService,public appCtrl:App) {}
 ionViewDidLoad(){
    this.wwwImg=this.wwwname.IpAdr();
    this.newarr=[];
 }
//==================test==============
toTest(){
  this.navCtrl.push(BarragePage);
}
ngAfterViewInit() { // 模板中的元素已创建完成
  //定时器dom
  this.bardom=this.sketchElement.nativeElement.querySelector('.barragebar');
  }
ionViewDidEnter(){
    //进入页面清楚定时器
    if(this.setInt){
      console.log("0:"+this.setInt);
      clearInterval(this.setInt);
    }
    if(this.timer){
    clearTimeout(this.timer);
  }
  if(this.storage.read("UserId")==null){
    setTimeout(then=>{
    this.appCtrl.getRootNav().push(LoginPage);
    },700)
  }else{
    this.setInt=setInterval(then=>{ this.barrages.func(this.bardom)},1000);
    this.timer=setInterval(then=>{this.barrages.move(1,this.bardom)},15);
  }
}
ionViewDidLeave(){
    //离开页面清楚定时器
    if(this.setInt){
      clearInterval(this.setInt);
    }
    if(this.timer){
    clearTimeout(this.timer);
    }
}
//rule auction
ruleFun(){
  this.showRulePage=true;
  this.tabsserver.hide();
}
//rule page
nextPage(num){
  this.showRule1=false;this.showRule2=false;this.showRule3=false;
  switch (num){
    case '1':{
      this.showRule2=true;
      break;
    }
    case '2':{
      this.showRule3=true;
      break;
    }
    case '3':{
      var set=setTimeout(then=>{
        this.backdrop('rule');
        this.showRule1=true;
        clearTimeout(set);
      }, 100);//防止事件溢出到tabs
      break;
    }
  }
}
//to 竞拍
toBidding(gid,num){
  if(num=='ok'){
    this.tabsserver.show();
  }
  if(this.showGdsInfo){
    this.showGdsInfo=!this.showGdsInfo;
  }
  this.navCtrl.push(BiddingPage,{'goodsId':gid});
}
//商品列表
toGoodsList(listId){
    if(this.showGdsInfo){
    this.showGdsInfo=!this.showGdsInfo;
  }
  // this.navCtrl.push(goodsListPage,{"listId":listId});
  this.showBackdrop=true;
  this.tabsserver.hide();

}
//查看商品
toGoodsInfo(gdsId){

  if(this.showBackdrop){
    this.showBackdrop=false;
  }
  this.showGdsInfo=true;
  this.tabsserver.hide();
}
//覆盖层
popover(ev){
  if(this.popovershow){
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
}
//关闭蒙版
backdrop(n){
   this.popovershow=false;
  this.tabsserver.show();
  let banTime=setTimeout(then=>{this.popovershow=true;clearTimeout(banTime);},500);//解决popover弹出层bug
  switch(n){
    case 'gdslist':{
      this.showBackdrop=false; 
      break;
    }
    case 'rule':{
      this.showRulePage=false; 
      break;
    }
    case 'gdsInfo':{
      this.showGdsInfo=false;
    }
  }

 
}
closeTap(m){
  this.backdrop(m);
  if(m=="rule"){
    this.showRule1=true;this.showRule2=false;this.showRule3=false;
  }
}
//关闭蒙版====end=====





}