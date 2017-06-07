import { Component,ViewChild } from '@angular/core';
import { NavController,PopoverController,Slides} from 'ionic-angular';
import {PopoverPage} from '../mypopover/mypopover';

@Component({
  selector: 'info-novice',
  templateUrl: 'Info.html'
})
export class InfoPage {
  @ViewChild('slic') sild:Slides;
  private autoP:number;showslide:boolean=false;slides=[];item=[];
  constructor(public navCtrl: NavController,public popoverCtrl:PopoverController) {}
  ionViewDidLoad(){
    this.item=[{'adimg':'./assets/images/zixun.jpg'},{'adimg':'assets/images/zixun.jpg'},{'adimg':'assets/images/zixun.jpg'}];
    this.showBanner(this.item);
  }
  ionViewDidEnter(){
    let settime1=setTimeout(then=>{this.slideChanged();clearTimeout(settime1)},100);
    
  
  }
  
    //离开
  ionViewDidLeave(){
    if(this.showslide){
      this.sild.stopAutoplay();
    } 
  }
  //get banner img to show banner
  showBanner(mm: any) {
    this.showslide = true;
    //slides
    this.slides = [
      {
        adimg: mm[0].adimg
      },
      {
        adimg: mm[1].adimg

      },
      {
        adimg: mm[2].adimg
      }
    ];
    // this.slides=mm;   
   
  }
  //solids
  slideChanged(){
    this.autoP=4000;
    if(this.showslide){
      this.sild.startAutoplay();
    }
  }

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










}
