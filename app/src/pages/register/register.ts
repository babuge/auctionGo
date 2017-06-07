import { Component,ViewChild} from '@angular/core';
import { NavController, AlertController,Content } from 'ionic-angular';
import { HomeModel } from '../../model/Home-model';
import { StorageService } from '../../providers/storageService';
import { TabsPage } from '../../pages/tabs/tabs';
import { WwwName } from '../../model/WwwName';
@Component({
  selector: 'register-page',
  templateUrl: 'register.html'
})
export class registerPage {
  @ViewChild(Content) mycontent: Content;
  backButtonPressed: boolean = false;
  public url: string = ""; uid: string; phone: number;phoneYzm:number; passWord: string;repassWord: string; alertC: any;
  public  wwwName: string = "";getFrist:any;pdFrist:boolean=false;pdtrue:boolean=true;pdtrue1:boolean=true;showPW:boolean=true;
  public showPW1:boolean=true;getLicese:boolean=true;VCode:boolean=true;gotoTimer:any;gotoNum:number=null;
  public Dxid:any;
  constructor(public navCtr: NavController, public homemodel: HomeModel, public storage: StorageService,
    public alertCtrl: AlertController, private wwwname: WwwName) {

  }
  ionViewDidLoad() {//页面加载完  
    this.wwwName = this.wwwname.name();
    // this.storage.remove("login");
    // this.getFrist=this.storage.read("FristComeInHome");
    // //   this.storage.write('UserId',res.id);
    // //   this.storage.write('UserImg',res.porfile);
    // //   this.storage.write("UserName",res.username);
    // // 刷新txt
    // if(this.getFrist==null||this.getFrist==undefined){
    //   this.pdFrist=true;
    // }else{
    //   this.pdFrist=false;
    // }
  }
  ionViewDidEnter(){
    this.pdtrue=true;
  }
  ionViewDidLeave(){
      if(this.gotoTimer){
          clearInterval(this.gotoTimer);
      }
  }
    //focus
  toBottom(){
    setTimeout(then=>{this.mycontent.scrollToBottom()},300);
  }
  //发送验证码
  getVCode(){
    
    if(this.pdtrue){
    this.pdtrue=false;
    let regd = /^1[34578]\d{9}$/;
    let rege = new RegExp(regd, "i");
    if (!rege.test(this.phone + "")) {
      this.showalert("手机号不正确！",3000);
      this.pdtrue=true;
      return;
    }
    // let url=this.wwwName+"/App/Index/regPhone";
    // let data={
    //   phone:this.phone
    // }
    // this.homemodel.postHome(url,JSON.stringify(data),res=>{
    //   console.log(res);
      this.pdtrue=true;
    //   if(res.code==10){
    //     this.showalert(res.msg,3000);
    //     return;
    //   }
    //   if(res.code==20){
          this.VCode=false;   
          this.gotoNum=60; 
          this.gotoTimer=setInterval(then=>this.gotoCode(),1000); 
          // let url=this.wwwName+"/App/Index/getDx";
          // let data={
          //   phone:this.phone
          // }
          // this.homemodel.postHome(url,JSON.stringify(data),res=>{
          //   console.log(res);
          //      if(res.code==10){
          //         this.showalert(res.msg,3000);
          //         return;
          //       }
          //       if(res.code==20){
                    // this.Dxid=res.info.dxid;
                // }
          // });    
        // }
        
    // })

    }
  }
  //60秒
  gotoCode(){
    if(this.gotoNum<=0){
      clearInterval(this.gotoTimer);
      this.gotoNum=null;
      this.VCode=true;
      return;
    }
   this.gotoNum--;
  }
  //toRegDx()
  toRegDx(){
     if(this.pdtrue1){
      this.pdtrue1=false;
    let regd = /^1[34578]\d{9}$/;
    let rege = new RegExp(regd, "i");
    if (!rege.test(this.phone + "")) {
      this.showalert("手机号不正确！",3000);
      this.pdtrue1=true;
      return;
    }
    // let url=this.wwwName+"/App/Index/regDx";
    // let data={
    //   phone:this.phone,
    //   num:this.phoneYzm,
    //   dxid:this.Dxid
    // }
    // this.homemodel.postHome(url,JSON.stringify(data),res=>{
    //   this.pdtrue1=true;
    //   console.log(res);
    //   if(res.code==10){
    //     this.showalert(res.msg,3000);
    //     return;
    //   }
    //   if(res.code==20){
    //     console.log(res.msg);
        this.getLicese=false;
    //   }
    // })
    }
  }
  //topassword
  toPassWord(){
    
    if(this.pdtrue){
    this.pdtrue=false;
    let regr = /^[\w\?\!\.\(\)\"\:]+$/;
    let regt = new RegExp(regr, "i");

    if (!regt.test(this.passWord + "")){
      this.showalert("密码格式不正确！",3000);
      this.pdtrue=true;
      return;
    }
    if (!regt.test(this.repassWord + "")){
      this.showalert("密码格式不正确！",3000);
      this.pdtrue=true;
      return;
    }
    // this.url = this.wwwName + "/App/Index/regPassword";
    // //post请求   
    // let datas = { 'phone': this.phone, 'password':this.passWord+"",'sure_password':this.repassWord+""}
    // this.homemodel.postHome(this.url,JSON.stringify(datas), (res) => {
    //     console.log(res);
    //     this.pdtrue=true;      
    //   if(res.code==10){
    //     this.showalert(res.msg,3000);
    //     return;
    //   }
    //   if(res.code==20){
        this.showalert('注册成功！',2000);
        setTimeout(then=>{this.navCtr.pop();},2000);
    //   }

    // });
    }
  }
  //show password
  clikFun(num){
    switch (num){
      case 1:{
        this.showPW=!this.showPW;
        break;
      }
      case 2:{
        this.showPW1=!this.showPW1;
      }
    }
    
  }
  //tip with alert
  showalert(text: string,num) {
    this.alertC = this.alertCtrl.create({
      cssClass: 'opinion.scss alertas',
      subTitle: text,
      enableBackdropDismiss: true
    });
    this.alertC.present();
    setTimeout(then => this.hideAlert(),num);
  }
  hideAlert() { this.alertC.dismiss(); }

 //to Login
 goLogin(){
   this.storage.write("login","TRUE"); 
   this.navCtr.pop();
 }


}