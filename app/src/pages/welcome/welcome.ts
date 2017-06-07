import { Component,ViewChild } from '@angular/core';
import {NavController,Slides,App} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import { StatusBar } from '@ionic-native/status-bar';
import {LoginPage} from '../../pages/login/login';
import { StorageService } from '../../providers/storageService';
@Component({
    selector:"welcome-page",
    templateUrl:"welcome.html"
    
})
export class WelcomePage{    
@ViewChild('slic') sild:Slides;
constructor(public navCtr: NavController,public statusbar:StatusBar,public storage:StorageService,public appCtrl:App){
}
ngOnInit(){
	this.statusbar.overlaysWebView(true);
	this.statusbar.hide();
	

}
goToHome(){
	this.storage.write("FristIn","TRUE");
	this.navCtr.setRoot(TabsPage);
	this.statusbar.show();
}
slideChanged(){
	if(this.sild.getActiveIndex()==(this.sild.length()-1)){
		this.sild.stopAutoplay();
	}else{
		// this.sild.startAutoplay();
	}
}
ionVeiwDidLeave(){
	
}




}