import { Injectable } from '@angular/core';

@Injectable()
export class WwwName {
constructor() {}
 name(){
     return "http://pmb.363app.com";
 }
 IpAdr(){
     return "http://image.363app.com";
 }
 bbs(){
     return "http://www.bbs.com";
 }
 public numb:number=0;
 //tabs控制器
 public fristComeInNumCtrl(num:number) {
        this.numb=num;
}
//tabs静态
 public fristComeInNum(){
     if(this.numb==null){
        return 1;
     }
     if(this.numb==1){
         return 1;
     }
     if(this.numb==0){
         return 0;
     }
 }
}