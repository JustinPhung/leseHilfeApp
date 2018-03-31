import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LeseruWordService, unitEnum } from '../../services/leseru.word.service';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  public displayWord: string;
  public displayBlueCircle: Boolean = false;
  public styles: any;

  public leseruInput : String = "";
  public showResultPic: Boolean = false;
  public resultPicStyle: any;

  constructor(public navCtrl: NavController, public leseruService: LeseruWordService, private splashScreen: SplashScreen){
    this.generateCenterDisplayLocation();
  }  
  ngOnInit(){
    this.splashScreen.show();
    this.generateNewDisplayWord();
  }
  public setDisplayLocation(){
    return this.styles;
  }
  public generateRandomDisplayLocation(){
    this.styles = {
      'position':'absolute',
      'top': (Math.random()* 90) + '%',
      'left': (Math.random()*100) + '%'
    };
  }
  public generateCenterDisplayLocation(){
    this.styles = {
      'position':'absolute',
      'top': '40%',
      'left': '40%'
    };
  }
  public async submitWord(){
    const result = this.leseruService.validateWord(this.leseruInput);
    if(result != -1){
      this.showResultPic = true;
      await this.showResultPicture(result);
      this.showResultPic = false;      
    }
    this.generateNewDisplayWord();
    this.leseruInput= "";
  }

  private async showResultPicture(resultInPercent: number){
    this.resultPicStyle = ResultStatus.NORMAL;
    if (resultInPercent > 80){
      this.resultPicStyle = ResultStatus.HAPPY;      
    }else if(resultInPercent > 90){
      this.resultPicStyle = ResultStatus.IMPRESSED;    
    }
    return await this.timeOutPromise(1000);
  }

  public getResultPic(){
    return this.resultPicStyle;
  }

  private generateDisplayLocation(unit){

    if(unit === unitEnum.JUMPSIGHT){
      this.generateRandomDisplayLocation();
    }else{
      this.generateCenterDisplayLocation();
    }

  }
  private async generateNewDisplayWord(){
    var nextWordUnit = this.leseruService.getNextWord();
    console.log(nextWordUnit);

    this.generateDisplayLocation(nextWordUnit.unit);

    this.displayBlueCircle = true;
    await this.countDown();
    this.displayBlueCircle = false;
    
    this.generateDisplayLocation(nextWordUnit.unit);
    
    this.displayWord = nextWordUnit.word;
    await this.timeOutPromise(nextWordUnit.time);
    this.resetDisplayWord();
  }
  
  private async countDown(){
    this.displayWord = '3';
    await this.timeOutPromise(1000);
    this.displayWord = '2';
    await this.timeOutPromise(1000);
    this.displayWord = '1';
    return await this.timeOutPromise(1000);
  }

  private timeOutPromise( time: number ) {
    return new Promise<void>(function(resolve) {
      setTimeout(resolve, time);
    });
  }

  private resetDisplayWord(){
    this.displayWord = '';
  }
}
enum ResultStatus {
  
      HAPPY = "happy",
      IMPRESSED = "impressed",
      NORMAL = "normal"
  }