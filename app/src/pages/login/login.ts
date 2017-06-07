import { Component,ViewChild } from '@angular/core';
import {  NavController, AlertController,Content} from 'ionic-angular';
import { HomeModel } from '../../model/Home-model';
import { StorageService } from '../../providers/storageService';
import { TabsPage } from '../../pages/tabs/tabs';
import { WwwName } from '../../model/WwwName';
import {registerPage} from '../../pages/register/register';
import {forgetPage} from '../../pages/forget/forget';
import { Keyboard } from 'ionic-angular';

@Component({
  selector: 'Login-page',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild(Content) mycontent: Content;
  backButtonPressed: boolean = false;
  public url: string = ""; uid: string; phone: number; passWord: string; alertC: any;
  public  wwwName: string = "";getFrist:any;pdFrist:boolean=false;pdtrue:boolean=true;showPW:boolean=true;
  constructor(public navCtr: NavController, public homemodel: HomeModel, public storage: StorageService,
    public alertCtrl: AlertController, private wwwname: WwwName,public keyboard: Keyboard) {

  }
  ionViewDidLoad() {//页面加载完  
    this.wwwName = this.wwwname.name();

  }
  ionViewDidEnter(){
    this.pdtrue=true;
        this.storage.remove("login");
    this.getFrist=this.storage.read("FristComeInHome");
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
  ionViewDidLeave(){
    this.storage.write("login","TRUE");    
  }
  //focus
  toBottom(){
    setTimeout(then=>{this.mycontent.scrollToBottom()},300);
  }
  //登录
  submite() {
    if(this.pdtrue){
      this.pdtrue=false;
    let regb = /^1[34578]\d{9}$/;
    let regc = new RegExp(regb, "i");
    if (!regc.test(this.phone + "")) {
      this.showalert("账号输入不正确！",3000);
      this.pdtrue=true;
      return;
    }

    let regd=/^[\w\?\!\:\"\(\)\.]+$/;
    let rege=new RegExp(regd,'i');
    if(!regd.test(this.passWord+"")){
      this.showalert("密码输入不规范！",3000);
      this.pdtrue=true;
      return;
    }
    // this.url = this.wwwName + "/App/Index/login";
    // //post请求   
    // let data={phone:this.phone,password:this.passWord }
    // this.homemodel.postHome(this.url,JSON.stringify(data),(res) => {
        this.pdtrue=true;  
    //     console.log(res);    
    //   if(res.code==10){
    //     this.showalert(res.msg,3000);
    //     return;
    //   }
    //   if(res.code==20){
        this.storage.write("UserId",'1');
        this.navCtr.push(TabsPage);
        console.log(this.storage.read("UserId"));
    //   }    
    // });
    }
  }
  //show password
  clikFun(){
    this.showPW=!this.showPW;
  }
  //tip with alert
  showalert(text: string,num:number) {
    this.alertC = this.alertCtrl.create({
      cssClass: 'opinion.scss alertas',
      subTitle: text,
      enableBackdropDismiss: true
    });
    this.alertC.present();
    setTimeout(then => this.hideAlert(), num);
  }
  hideAlert() { this.alertC.dismiss(); }

  //to register
  goReg(){
      this.navCtr.push(registerPage);
  }
  //to goforget
  goForget(){
    this.navCtr.push(forgetPage);
  }

}