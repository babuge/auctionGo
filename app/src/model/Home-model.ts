import { HttpServer } from '../providers/http-server';
import { ICallBack } from '../interface/Index';
import { Injectable } from '@angular/core';

@Injectable()
export class HomeModel {
  constructor(public http: HttpServer) { }
  //post请求
  postHome=(url,data,callback:Function):any =>{
    this.http.doPosts(url,data).then((res:ICallBack)=>{ 
      if(res!=undefined||res!=null){
        callback(res);
      }
    });
  }
  // get请求
  getAll = (url,callback:Function):any => {
    this.http.doGet(url).then((res:ICallBack)=>{
      if(res!=undefined||res!=null){
        callback(res);
      }
    });
  }

}
