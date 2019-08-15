import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, Platform, LoadingController, AlertController,Content } from 'ionic-angular';

import { WebService } from '../../providers/web-service';
import { ListPage } from '../list/list';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('mySliderH') sliderh : Slides;
  @ViewChild('mySliderC') sliderc : Slides;
  @ViewChild(Content) content: Content;

  slidersHeader: any;
  slidersContent: any;
  selectedSegment:any;

  projects: any[] = [];
  projectActive = false;

  //
  liveContest : Array<any> = new Array(0);
  freeContest : Array<any> = new Array(0);
  category    : Array<any> = new Array(0);

  ngAfterViewInit() {
      //this.sliderc.autoHeight = true;
      this.sliderh.slidesPerView = 3;  
  }

  onContentSlideChanged(slider) {
        const currentSlide = this.slidersHeader[slider.getActiveIndex()];
        if(typeof(currentSlide)!="undefined") {
            this.selectedSegment = currentSlide;

            if(this.selectedSegment.id == 1) {
                if(this.liveContest.length==0){
                    this.getSliderData("live_contest");
                }
            }
            if(this.selectedSegment.id == 2) {
                if(this.freeContest.length==0){
                    this.getSliderData("free_contest");
                }
            }
            if(this.selectedSegment.id == 3) {
                if(this.category.length==0){
                    this.getSliderData("category");
                }
            }
           // this.sliderh.slideTo(slider.getActiveIndex());
        }   
  }
  scrollToTop(slider) {
      this.content.scrollToTop();
  }
  onSegmentChanged(segmentButton) {
    const selectedIndex = this.slidersContent.findIndex((slide) => {
        return slide.sliderId === segmentButton.id;
    });
    this.sliderc.slideTo(selectedIndex);
  }
  goToListPage(searchtype,searchdetails) {
    var searchDetails = {"searchType":searchtype,"searchString":searchdetails.key}
    this.navCtrl.push(ListPage,searchDetails);
  }

  goToDetailPage(contest_id) {
    var postDetails = {"contest_id":contest_id};
    this.navCtrl.push(DetailsPage,postDetails);
  }
  getSliderData(currentSlider:any) {
    const loaderHome = this.loadingCtrl.create({
	    content: "Please wait..."
	});
    loaderHome.present();
    this.webService.getHomePageContent(currentSlider)
        .subscribe(res => {         
            console.log(res);
            if(res.status == "success") {
                if(res.result=="live_contest" && res.count!=0) {
                    this.liveContest=res.list;
                }
                if(res.result=="free_contest" && res.count!=0) {
                    this.freeContest=res.list;
                }
                if(res.result=="category" && res.count!=0) {
                    this.category=res.list;
                }
                if(res.count==0) {
                    loaderHome.dismiss();
                    const count_alert = this.alertCtrl.create({
                        // title: 'Network Error',
                         subTitle: res.message,
                         buttons: ['OK']
                     });
                     count_alert.present();
                }

                var temp = this;
                setTimeout(function(){
                    loaderHome.dismiss();
                    temp.sliderc.update();
            //    if(parseInt(res.app_version) === 2) {
            //       temp.goToUpdate();        
            //    }
                },2000)
            } 
            if(res.status == "error") {
                loaderHome.dismiss();
                const error_alert = this.alertCtrl.create({
                   // title: 'Network Error',
                    subTitle: res.message,
                    buttons: ['OK']
                });
                error_alert.present();
            }

            
        },
        error => {
            loaderHome.dismiss();
            const alert = this.alertCtrl.create({
                title: 'Network Error',
                subTitle: 'Sorry...!!!. Please try again later',
                //subTitle: JSON.stringify(error),
                buttons: ['OK']
            });
            alert.present();
            
        }
        );
  }

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public platform: Platform,public webService: WebService,public alertCtrl: AlertController) {
    this.slidersHeader = [
        {id: 1,title: "Live Contest",page: "User"},
        {id: 2,title: "Free Contest",page: "FanSong"},
        {id: 3,title: "Category",page: ""}
    ];
    this.slidersContent = [
        {"sliderId":1,"sliderName":"Live Contest"},
        {"sliderId":2,"sliderName":"Free Contest"},
        {"sliderId":3,"sliderName":"Category"}
    ]; 
    
    this.selectedSegment = { id: 1, title: "Live Contest"};    
    	        
    platform.ready().then(() => {
        //this.createBanner();
        //this.showInterstitial();
        this.getSliderData("live_contest");
        });
  }

}
