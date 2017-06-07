import { Component, ViewChild, ElementRef } from '@angular/core';

import { PopoverController, NavParams } from 'ionic-angular';


@Component({
    selector:"mypopover-page",
  templateUrl:'mypopover.html' 
})
export class PopoverPage {
  @ViewChild('popoverEles') mytap:ElementRef;
  background: string;
  contentEle: any;
  textEle: any;
  fontFamily;

  colors = {
    'white': {
      'bg': 'rgb(255, 255, 255)',
      'fg': 'rgb(0, 0, 0)'
    },
    'tan': {
      'bg': 'rgb(249, 241, 228)',
      'fg': 'rgb(0, 0, 0)'
    },
    'grey': {
      'bg': 'rgb(76, 75, 80)',
      'fg': 'rgb(255, 255, 255)'
    },
    'black': {
      'bg': 'rgb(0, 0, 0)',
      'fg': 'rgb(255, 255, 255)'
    },
  };

  constructor(private navParams: NavParams) {

  }

  ngOnInit() {

    // if (this.navParams.data) {
    //     //this.navParams.data 以json的方式get数据
    //   this.contentEle = this.navParams.data.contentEle;
    //   this.textEle = this.navParams.data.textEle;

    //   this.background = this.getColorName(this.contentEle.style.backgroundColor);
    //   this.setFontFamily();
    // }
  }
  //关注
  goBbs(i:number){
      let sel=this.mytap.nativeElement.querySelectorAll('.text-tap');
      //移除所以active
      for(var j=0;j<sel.length;j++){this.removeClass(sel[j],"active");}
      this.addClass(sel[i],"active");
      switch (i){
        case 0:{
          break;
        }
        case 1:{
          break;
        }
        case 2:{
          break;
        }
        case 3:{
          break;
        }
      }

  }
  //javaScript 扩展=========
    //检测
    hasClass(element, className) { 
        var reg = new RegExp('(\\s|^)'+className+'(\\s|$)'); 
        return element.className.match(reg); 
    } 
    //添加
   public addClass(element, className) { 
        if (!this.hasClass(element, className)) 
        { 
        element.className += " "+className; 
        } 
    } 
    //移除
    removeClass(element, className) { 
        if (this.hasClass(element, className)) { 
            var reg = new RegExp('(\\s|^)'+className+'(\\s|$)'); 
            element.className = element.className.replace(reg,' '); 
        } 
    }
  //javaScript 扩展=========end============    
  
  // getColorName(background) {
  //   let colorName = 'white';

  //   if (!background) return 'white';

  //   for (var key in this.colors) {
  //     if (this.colors[key].bg == background) {
  //       colorName = key;
  //     }
  //   }

  //   return colorName;
  // }

  // setFontFamily() {
  //   if (this.textEle.style.fontFamily) {
  //     this.fontFamily = this.textEle.style.fontFamily.replace(/'/g, "");
  //   }
  // }

  // changeBackground(color) {
  //   this.background = color;
  //   this.contentEle.style.backgroundColor = this.colors[color].bg;
  //   this.textEle.style.color = this.colors[color].fg;
  // }

  // changeFontSize(direction) {
  //   this.textEle.style.fontSize = direction;
  // }

  // changeFontFamily() {
  //   if (this.fontFamily) this.textEle.style.fontFamily = this.fontFamily;
  // }
}
