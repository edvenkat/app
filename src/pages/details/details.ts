import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform, AlertController,ToastController } from 'ionic-angular';

import {DomSanitizer } from '@angular/platform-browser';
import { WebService } from '../../providers/web-service';


@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  songLyrics : Array<any> = new Array();
  html : any;
  post_id :any;
  fav : any = "download";
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,public platform: Platform,public webService: WebService,public alertCtrl: AlertController,public toastCtrl: ToastController ) {
        var temp = this;
        const loaderDetails = this.loadingCtrl.create({
			content: "Please wait..."
		});
		//loaderDetails.present();
         platform.ready().then(() => {
            //this.showInterstitial();
            var filterObject = this.navParams.data;
            console.log(filterObject);
            

        });        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }  
}