import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LoadingController, AlertController } from 'ionic-angular';　　//引入加载框和更新提示框
import { Transfer, FileOpener,AppVersion} from 'ionic-native';　　　　//引入更新需要的几个插件
import { HomeModel } from '../model/Home-model';
import {WwwName} from "../model/wwwName";
@Injectable()
export class UpdateappProvider {
  // private appUrl="http://xxx/xxx.apk";  //可以从服务端获取更新APP的路径
  private wwwName:any;myversion:string="";
  constructor(public homemodel:HomeModel,public wwwname:WwwName,private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
      this.wwwName=this.wwwname.name();
}
  //检查版本更新
  checkUpdate(){  
    let execName = this.wwwName+'/Api/Bbh/get_url';
    let param = {
      type: '1'
    }
　　//查询当前服务器的APP版本号与当前版本号进行对比
    this.homemodel.postHome(execName,JSON.stringify(param),(data)=> {
      if(data.trim()=="PROERROR"){
        console.log(data);
        return;
      }
      console.log(data);
      AppVersion.getVersionNumber().then((version) => {
        console.log(version);
        let verData=JSON.parse(data);
        if (verData.version!=version) {
          // this.appUrl=data[0].APPURL;  //可以从服务端获取更新APP的路径
          let updateAlert = this.alertCtrl.create({
            title: '',
            message: '发现新版本,是否立即更新?',
            buttons: [{
              text: '取消'
            }, {
              text: '确定',
              handler: data => {
                this.upgradeApp(verData.url);
              }
            }
            ]
          });
          updateAlert.present();
        }
      });
    });
  }

  upgradeApp(upurl) {
    const fileTransfer = new Transfer();

    let uploading = this.loadingCtrl.create({
      content: "安装包正在下载...",
      dismissOnPageChange: false
    });


    var targetPath = "/sdcard/Download/mlm.apk"; //APP下载存放的路径，可以使用cordova file插件进行相关配置
    // var options = {};
    uploading.present();

    fileTransfer.onProgress((event) => {
      //进度，这里使用文字显示下载百分比
      // setTimeout(() => {
        var downloadProgress = (event.loaded / event.total) * 100;
        uploading.setContent("已经下载：" + Math.floor(downloadProgress) + "%");

        if (downloadProgress > 99) {
          uploading.dismiss();
        }
      // }, 100);

      /* setTimeout(() => {
       uploading.dismiss();
       }, 10000);*/

    });

    //url为服务端地址
    //targetPath为设备上的地址
    fileTransfer.download(upurl, targetPath, true).then(
      (result) => {
        uploading.dismiss();
        FileOpener.open(targetPath, 'application/vnd.android.package-archive').then(
          () => {
          });
      }
    );

  }

}