import { Component, ElementRef,ViewChild} from '@angular/core';
import { NavController,NavParams} from 'ionic-angular';
import {CanvasService} from '../../providers/canvasServer';
import {WwwName} from '../../model/WwwName';
@Component({
  selector: 'page-Barrage',
  templateUrl: 'Barrage.html'
})
export class BarragePage {
  @ViewChild('car') canvasBar:ElementRef;
  private Mycanvas:any;radomH:any=[10,30,50,70,90,110,130];MyCanvasW:any;MyCanvasH:any;Myctx:any;arry=[];
  private renum:any;setnum:any=0;
  constructor(public navCtrl:NavController,public canerver:CanvasService){}

  ionViewDidLoad(){
    this.Mycanvas=this.canvasBar.nativeElement.querySelector('canvas');
    this.MyCanvasW=this.Mycanvas.offsetWidth;
    this.MyCanvasH=this.Mycanvas.offsetHeight;
    console.log(this.Mycanvas);
    console.dir(this.Mycanvas);
    console.log(this.MyCanvasH,this.MyCanvasW);
    this.Myctx=this.Mycanvas.getContext("2d");


  }
  ionViewDidEnter(){
    this.drawText();
    for(var j=0;j<10;j++){
        console.log(this.arry[j]);
        
    }
  }
  //canvas 画
  drawText(){
      
      //模拟得到信息
      for(var i=0;i<10;i++){
          let topnum=this.generateMixed(this.renum);
          this.renum=topnum;
        this.arry[i]=this.canerver.getHeroes(i,"50",this.getReandomColor(),topnum,this.MyCanvasW+10);
      }    
  }
  showCan(){
      this.Myctx.clearRect(0,0,this.MyCanvasW,this.MyCanvasH);
      this.Myctx.beginPath();
      
  }
  //随机色
  public  getReandomColor(){ 
  return '#' + (function(h) { 
    return new Array(7 - h.length).join("0") + h 
  })((Math.random() * 0x1000000 << 0).toString(16)); 
 }

 //随机行 与上一个不同
 public generateMixed(re) {
   var id = Math.floor(Math.random() *7); 
   if(this.radomH[id]==re){
     this.generateMixed(re);
   }else{
      return this.radomH[id];  
   }
}
 //===





}



export class intInfo{
    speed:5;

    
}