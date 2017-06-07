import { Component, ElementRef,ViewChild ,ContentChild} from '@angular/core';
import {trigger, state, style, animate, transition,keyframes} from '@angular/animations';
import { DomSanitizer} from '@angular/platform-browser'
import { NavController,NavParams,PopoverController,Content} from 'ionic-angular';
import {WwwName} from '../../model/WwwName';
import {PopoverPage} from '../mypopover/mypopover';
import {barrageModel} from '../../model/barrageModel';
@Component({
  selector: 'page-bidding',
  templateUrl: 'bidding.html',
    styles:[`
    .activeTip {
    height:105px;
    }
    .inactiveTip {
    height:0px;
    }`
    ],
  animations:[
          trigger('heroState', [
      state('inactiveTip', style({
        height: '0px'
      })),
      state('activeTip', style({
        height:'105px',
        backgroundColor:'rgba(0,0,0,0.6)'
      })),
      state('activeTip1',style({
        height:'105px',
        backgroundColor:'rgba(0,0,0,0.6)'
      })),
      transition('inactiveTip => activeTip', animate('100ms ease-in')),
      transition('activeTip => inactiveTip', animate('100ms ease-out'))
     
      ])
    //   transition('activeTip =>activeTip',animate('10000ms '))
  
  ]
})
export class BiddingPage {
  @ViewChild('sketchElement') sketchElement:ElementRef;
    @ViewChild('roundFourH') roundH:ElementRef;
  @ViewChild('numprice') numprice:ElementRef;
  @ViewChild('Content') mycontent: Content;
private runnum;renum;bardom;radomH:any=[10,30,50,70,90,110,130];
private setInt:any;timer:any=null;tipShowBar:boolean=true;numpri:any=null;prinum:any=null;setIntNum:number=0;judgeDom:boolean=false;
private newtime:any=null;countdownM:any='00';countdownS:any='00';state:any="inactiveTip";showbiddingTip:boolean=true;setState:any=null;
private roundTip:string="";showFrRound:boolean=true;intFourH:any;showPriBar:boolean=true;
constructor(public navCtrl: NavController,public wwwname:WwwName,public popoverCtrl:PopoverController,public barrages:barrageModel){}
ngAfterViewInit() { // 模板中的元素已创建完成
  //定时器dom
  this.bardom=this.sketchElement.nativeElement.querySelector('.barragebar');
  //push price number
  this.numpri=this.numprice.nativeElement.querySelectorAll('.keyCode');
    //可视高度
 // console.dir(this.mycontent._fixedContent.nativeElement.offsetHeight);
  //屏幕高度
 // console.dir(this.mycontent._fixedContent.nativeElement.clientHeight);
 // console.dir(this.mycontent._elementRef.nativeElement.clientHeight);
//获得四轮高 52=45(header)+5(pushPri-H)+2(border-top)
this.intFourH=this.mycontent._elementRef.nativeElement.clientHeight- this.bardom.offsetHeight-52;
this.roundH.nativeElement.style.height=this.intFourH+'px';
let roundHDom=this.roundH.nativeElement;
roundHDom.querySelector('.roundInfo').style.height=this.intFourH*0.45+"px";
roundHDom.querySelector('.roundTouch').style.height=this.intFourH*0.55+"px";
roundHDom.querySelector('.timer').style.height=roundHDom.querySelector('.timer').offsetWidth+"px";
roundHDom.querySelector('.bgIcon').style.height=roundHDom.querySelector('.bgIcon').offsetWidth+"px";
roundHDom.querySelector('.timer').style.lineHeight=roundHDom.querySelector('.timer').offsetWidth+"px";
roundHDom.style.display="none";
}
 ngOnInit() {//页面加载完成后自己调用==>页面初始化时 



 }
ionViewDidLoad(){//非活跃状态

}
ionViewDidEnter(){//活跃

     this.startFun();
    //进入页面清楚定时器
    if(this.setInt){
      clearInterval(this.setInt);
    }
    if(this.timer){
    clearTimeout(this.timer);
  }
    this.setInt=setInterval(then=>{ 
        this.setIntNum++;
        this.barrages.func(this.bardom);
        this.GetRTime();
        if(this.setIntNum%2==0){//两秒
            this.activeFun(this.numpri);
        }
    },1000);
    this.timer=setInterval(then=>{this.barrages.move(1,this.bardom)},15);

    //  this.intPricH(this.numpri,50);
    this.round(this.numpri);
}

ionViewDidLeave(){
    //离开页面清楚定时器
    if(this.setInt){
      clearInterval(this.setInt);
    }
    if(this.timer){
    clearTimeout(this.timer);
  }

    this.judgeDom=false;
}
//back
popback(){
    this.navCtrl.pop();
}
//to goodInfo
toGoodsInfo(){

}
//覆盖层
popover(ev){
    let option={
       cssClass: 'popoverCss',
    // showBackdrop: true,
    enableBackdropDismiss:true
    }
    let popover = this.popoverCtrl.create(PopoverPage,{},option);

    popover.present({
      ev: ev
    });
  
}
//请求得到轮数数据
round(dom){
    var radomRound=Math.floor(Math.random()*4+1);
    //必须初始化为true，这儿false，不然dom树里面没有他们
    this.showFrRound=true;
    this.showPriBar=true;
    switch (radomRound){//1为第一轮
        case 1:{
            this.roundTip="第一轮";
            this.showPriBar=true;
            this.intPricH(dom,50);
            break;
        }
        case 2:{
            this.roundTip="第二轮"; 
            this.showPriBar=true;           
            this.intPricH(dom,35);
            break;
        }
        case 3:{
            this.roundTip="第三轮";
            this.showPriBar=true;
            this.intPricH(dom,20);
            break;
        }
        case 4:{
            this.roundTip="第四轮";    
            this.showFrRound=true;  
            this.roundH.nativeElement.style.display="block";
            // this.intPricH(dom,50);
            // alert("此功能暂未开放，敬请期待！");
             this.intPricH(dom,5);
            break;
        }
    }
}
//初始化numprice bar height
intPricH(dom,domtag){
    if(domtag==5){
        this.numprice.nativeElement.innerHTML="此功能暂未开放，敬请期待！";
        return;
    }
    let domw=dom[0].offsetWidth;//dom可是宽度
    for(var domi=0;domi<dom.length;domi++){
        dom[domi].style.height=domw+'px';
        var domnum=domtag-domi;
        dom[domi].innerHTML=domnum;
        dom[domi].style.lineHeight=domw+'px';
        dom[domi].onclick=(e)=>{this.pushPric(e);};//e为当前事件 --其中但run here and throw oneself
    }
    this.judgeDom=true;
}
//dom click
pushPric(nu){
    this.prinum=nu.srcElement.innerHTML;//event.srcElement~=this.document
    console.log(this.prinum); 
    //post data url
    //模拟

}
//toggleState
  toggleState() {
      if(this.setState){
          clearTimeout(this.setState);
      }
      if(this.showbiddingTip){
          this.showbiddingTip=false;      
        this.state = (this.state === 'activeTip' ? 'inactiveTip' : 'activeTip');
        //第一次请求====模拟
        //success
        // this.showbiddingTip=true;
        //......setstate 
        // if(this.showbiddingTip){
        this.setState=setTimeout(then=>{
            this.state='inactiveTip';
            this.showbiddingTip=true;
        }, 2000);
        // }
      }else{
      //再次请求
        //......      
      this.state='activeTip';
      this.setState=setTimeout(then=>{
            this.state='inactiveTip';
            this.showbiddingTip=true;
        }, 2000);
      }
  }
//循环
activeFun(actDom){
    if(this.judgeDom){
    var actradom=Math.floor(Math.random()*15);
    for(var actnum=0;actnum<actDom.length;actnum++){
        this.removeClass(actDom[actnum],"active");
    }
    this.addClass(actDom[actradom],"active");
    }
}
//开始时间
startFun(){
     var startTime = new Date();
    //定义参数可返回当天的日期和时间
    startTime.setFullYear(2017, 5, 30);
    //调用设置年份
    startTime.setHours(23);
    //调用设置指定的时间的小时字段
    startTime.setMinutes(59);
    //调用设置指定时间的分钟字段
    startTime.setSeconds(59);
    //调用设置指定时间的秒钟字段
    startTime.setMilliseconds(999);
    //调用置指定时间的毫秒字段
    this.newtime=startTime.getTime();
    //定义参数可返回距 1970 年 1 月 1 日之间的毫秒数
}
GetRTime(){
//定义方法
    if(this.newtime){
    var NowTime = new Date();
    //定义参数可返回当天的日期和时间
    var nMS = this.newtime - NowTime.getTime();
    //定义参数 EndTime减去NowTime参数获得返回距 1970 年 1 月 1 日之间的毫秒数
    // var nD = Math.floor(nMS/(1000 * 60 * 60 * 24));
    // //定义参数 获得天数
    // var nH = Math.floor(nMS/(1000*60*60)) % 24;
    // //定义参数 获得小时
    let nM:any = Math.floor(nMS/(1000*60)) % 60;
    // //定义参数 获得分钟
    let nS:any = Math.floor(nMS/1000) % 60;
    if(nS<10){
        nS='0'+nS;
    }
    if(nM<10){
        nM='0'+nM;
    }
    // //定义参数 获得秒钟
    if (nMS<=0){
    //如果秒钟小于0
        this.navCtrl.pop();
    }else{
        this.countdownM=nM;
        this.countdownS=nS;
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
}