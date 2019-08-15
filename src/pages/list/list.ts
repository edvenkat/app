import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

import { WebService } from '../../providers/web-service';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {

  songList : Array<any> = new Array(0);
  searchResultListCurrentCount : any;
  searchResultListTotalCount : any;
  searchResultListPageNo : any = 0;
  searchType : any
  searchString : any
  ajaxCompleted = false;
  entryFee : any = {
    upper:100,
    lower:50
  }
  contestSize  : any = {
    upper:100,
    lower:50
  }
  showFilter = false;
  showFliterFunction() {
    this.showFilter = !this.showFilter;
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,public webService: WebService,public alertCtrl: AlertController) {
    var filterObject = this.navParams.data;
    console.log(filterObject);
    this.searchType = filterObject.searchType;
    this.searchString = filterObject.searchString;
    //this.getsongs(this.searchType,0,this.searchString )
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
  getMore() {
    this.searchResultListPageNo = parseInt(this.searchResultListPageNo) + 1;
    this.getsongs(this.searchType,this.searchResultListPageNo,this.searchString)
  }
  getsongs(searchtype:any,pageno:any,searchstring:any) {
  }
  goToDetailPage(post_id) {
  }
}
