import { Injectable } from '@angular/core';
import { canvasInfo } from '../interface/Index';
@Injectable()
export class CanvasService {
  private _canvasInfo:canvasInfo;
  constructor() {
      
  }
  getHeroes(id:number,text:string,Color:string,top:number,left:number){
      this._canvasInfo = {
        id:id,
        text:text,
        Color:Color,
        top:top,
        left:left
      }
    return this._canvasInfo;
  }
}

  