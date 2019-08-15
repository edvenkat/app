import { Injectable } from '@angular/core';
import { Platform, ToastController } from 'ionic-angular';
import { Http,Headers, RequestOptions,Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';


@Injectable()
export class WebService {
  
  //webserviceurl : any = 'http://192.168.1.8/bidding/mobile/';
  webserviceurl : any = 'http://localhost/bidding/mobile/';

  
  appVersion = "1";
  accessToken = "vesavi";
  constructor(public http: Http,public platform: Platform,public toastCtrl: ToastController) {
  }
  

  getHomePageContent(contestType:any): Observable<any> {
    let url = 'gethome.php';

    let query ='?appVersion='+this.appVersion+'&accessToken='+this.accessToken;
    query += '&getData='+ contestType;
    let postData = {
      "appVersion": this.appVersion,
      "accessToken": this.accessToken,
      "getData": contestType
    }
    //var response = this.http.post(this.webserviceurl+url,postData)
    var response = this.http.get(this.webserviceurl+url+query) 
    .map((res : Response) => res.json())
    return response;
  }
  
}