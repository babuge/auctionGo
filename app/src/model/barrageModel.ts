import { Injectable } from '@angular/core';

@Injectable()
export class barrageModel {
public runmun:any=0;
public runnum:any=0;
public radomH:any=[10,30,50,70,90,110,130];
public renum:any=0;
//弹幕生成器========html: class="barrage"======
func(bardom){
  this.runnum++;
  var newnode=document.createElement("p");
                        newnode.className='barrage';
                        newnode.innerHTML="text"+this.runnum;
                        let topnum=this.generateMixed(this.renum);
                        this.renum=topnum;
                        newnode.style.top=topnum+"px";
                        newnode.style.right="-20px";
                        newnode.style.width="0px";
                        newnode.style.color=""+this.getReandomColor();
    bardom.appendChild(newnode);
    
}
  move(speed,bardom){//speed速度
        let subbardom=bardom.querySelectorAll('.barrage');
        for(var i=0;i<subbardom.length;i++){
                subbardom[i].style.width=speed+subbardom[i].offsetWidth+'px';
                if(subbardom[i].offsetWidth>bardom.offsetWidth+80){
                        bardom.querySelectorAll('.barrage')[i].remove();//不循环
                        }
        }
}
 
//随机获取颜色值  
public  getReandomColor(){ 
  return '#' + (function(h) { 
    return new Array(7 - h.length).join("0") + h 
  })((Math.random() * 0x1000000 << 0).toString(16)); 
} 


public generateMixed(re) { 
   var id = Math.floor(Math.random() *7); 
   if(this.radomH[id]==re){
     this.generateMixed(re);
   }else{
      return this.radomH[id];  
   }
} 
//=======弹幕生成器=====end=========

}