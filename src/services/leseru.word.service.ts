import { Injectable } from '@angular/core';
import { Settings } from './settings';
import { RandomWordService } from './random.word.service';
import { ToastController } from 'ionic-angular';

export enum unitEnum { ONESIGHT =  'oneSight', JUMPSIGHT  = 'jumpSight'}
    
@Injectable()
export class LeseruWordService {

    readonly regularSessionLength = 1;
    readonly testSessionLength = 1;
    readonly testSessionStartWordLength = 2;
    readonly testSessionStartTime = 350;

    private sessionInitialized: boolean = false;
    private isTestSession: boolean;
    private displayWord: string;
    private session: {
        sessionLength: number;
        wordcount: number;
        practiceUnit: any;
        correct: number;
        wordlength: number;
        time: number;
    };

    private leseruStatus: any;

    constructor( private settings: Settings, private rnd: RandomWordService, private toastCtrl: ToastController ) {

    }

    public getIsSessionInitialized(): boolean{
        return this.sessionInitialized;
    }

    public loadSettings(){
            if (this.leseruStatus == undefined){
                this.settings.load().then( () =>{
                    this.settings.getValue("leseruStatus")
                        .then(value => {
                            if(value !== undefined ){
                                this.leseruStatus = value;
                            }else{
                                this.leseruStatus ={
                                    testSession: { 
                                        done: false, 
                                        status: { wordlength: 0, level: 0 }
                                    },
                                    oneSight: { wordlength: 0, time: 0, level: 0, lastCorrectPercentage: 0 }, 
                                    jumpSight: { wordlength: 0, time: 0, level: 0, lastCorrectPercentage: 0 }
                                }
                            }
                            this.initializeSettings();
                        })
                        .catch(() => console.log("error while load value"));
                });
            }
        }

    validateWord(insertedWord){

        if(insertedWord == this.displayWord){
            this.session.correct += 1;
        }

        if (this.session.wordcount == this.session.sessionLength){
            const thisCorrectPercentage = (this.session.correct / this.session.sessionLength) * 100;        
            if(this.isTestSession){
                this.finishTestSession(thisCorrectPercentage);
            }else{
                this.finishSession(thisCorrectPercentage);
            }
            return thisCorrectPercentage;
        }

        return -1;
    }

    private finishTestSession(thisCorrectPercentage: number){
        console.log(this.leseruStatus);
            if( thisCorrectPercentage > 80 ){
                this.leseruStatus.testSession.status.level += 1;
                this.leseruStatus.testSession.status.wordlength = Math.floor(this.leseruStatus.testSession.status.level/2) + 2;
                this.save();
                this.setNextTestSession();
            }else{
                this.finishTest();
            }        
    }

    private finishTest(){

        this.leseruStatus.testSession.done = true;
        switch(this.leseruStatus.testSession.status.level){
            case 0:
                this.leseruStatus.oneSight = { wordlength: 2, time: 450, level: 1, lastCorrectPercentage: 0 },
                this.leseruStatus.jumpSight = { wordlength: 2, time: 450, level: 1, lastCorrectPercentage: 0 }
                this.save();
                break;
            case 1:
                this.leseruStatus.oneSight = { wordlength: 2, time: 350, level: 3, lastCorrectPercentage: 0 },
                this.leseruStatus.jumpSight = { wordlength: 2, time: 450, level: 1, lastCorrectPercentage: 0 }
                this.save();
                break;
            case 2:
                this.leseruStatus.oneSight = { wordlength: 2, time: 350, level: 3, lastCorrectPercentage: 0 },
                this.leseruStatus.jumpSight = { wordlength: 2, time: 350, level: 3, lastCorrectPercentage: 0 }
                this.save();
                break;
            case 3:
                this.leseruStatus.oneSight = { wordlength: 3, time: 350, level: 8, lastCorrectPercentage: 0 },
                this.leseruStatus.jumpSight = { wordlength: 2, time: 350, level: 3, lastCorrectPercentage: 0 }
                this.save();
                break;
            case 4:
                this.leseruStatus.oneSight = { wordlength: 3, time: 350, level: 8, lastCorrectPercentage: 0 },
                this.leseruStatus.jumpSight = { wordlength: 3, time: 350, level: 8, lastCorrectPercentage: 0 }
                this.save();
                break;
            case 5:
                this.leseruStatus.oneSight = { wordlength: 4, time: 350, level: 13, lastCorrectPercentage: 0 },
                this.leseruStatus.jumpSight = { wordlength: 3, time: 350, level: 8, lastCorrectPercentage: 0 }
                this.save();
                break;
            case 6:
                this.leseruStatus.oneSight = { wordlength: 4, time: 350, level: 13, lastCorrectPercentage: 0 },
                this.leseruStatus.jumpSight = { wordlength: 4, time: 350, level: 13, lastCorrectPercentage: 0 }
                this.save();
                break;
            case 7:
                this.leseruStatus.oneSight = { wordlength: 5, time: 350, level: 18, lastCorrectPercentage: 0 },
                this.leseruStatus.jumpSight = { wordlength: 4, time: 350, level: 13, lastCorrectPercentage: 0 }
                this.save();
                break;
            case 8:
                this.leseruStatus.oneSight = { wordlength: 5, time: 350, level: 18, lastCorrectPercentage: 0 },
                this.leseruStatus.jumpSight = { wordlength: 5, time: 350, level: 18, lastCorrectPercentage: 0 }
                this.save();
                break;

        }
        console.log("Du hast den Einstiegstest beendet");
        this.setNextSession();
        
    }

    private setNextTestSession(){
        this.session = { 
            wordcount: 0, 
            practiceUnit:  (this.leseruStatus.testSession.status.level % 2 == 0)? unitEnum.ONESIGHT : unitEnum.JUMPSIGHT, 
            correct: 0, 
            sessionLength: this.testSessionLength,
            wordlength: this.leseruStatus.testSession.status.wordlength,
            time: this.testSessionStartTime
        };
    }

    private setNextSession(){
        const nextUnit = this.getUnit();
        const nextSession = this.leseruStatus[nextUnit];

        this.session = { 
            wordcount: 0, 
            practiceUnit: nextUnit, 
            correct: 0, 
            sessionLength: this.regularSessionLength,
            wordlength: nextSession.wordlength,
            time: nextSession.time
        };
    }

    private finishSession(thisCorrectPercentage: number){
        const lastCorrectPercentage = this.getLastCorrectPercentage(this.session.practiceUnit);
        if( thisCorrectPercentage > 90 || (lastCorrectPercentage > 80 && thisCorrectPercentage > 80)){
            this.finishLevel(this.session.practiceUnit);
        }else{
            this.updateCorrectPercentage(this.session.practiceUnit, thisCorrectPercentage);
        }
        this.save();
        this.setNextSession();        
    }

    private finishLevel(practiceUnit):void {
        console.log (this.leseruStatus);
        this.leseruStatus[practiceUnit].level += 1;
        this.leseruStatus[practiceUnit].wordlength = Math.floor((this.leseruStatus[practiceUnit].level -1) / 5) + 1;
        this.leseruStatus[practiceUnit].time = (this.leseruStatus[practiceUnit].time == 250) ? 450 : this.leseruStatus[practiceUnit].time - 50;
    }

    private updateCorrectPercentage( practiceUnit, correctPercentage ): void{
        this.leseruStatus[practiceUnit].lastCorrectPercentage = correctPercentage;
    }

    private save(){
        this.settings.setValue('leseruStatus', this.leseruStatus);
    }

    getNextWord(): {word: string, time: number, unit: any}{
 
        this.displayWord = this.getWord(this.session.practiceUnit, this.session.wordlength);
        console.log(this.session);
        return {
            word : this.displayWord, 
            time: this.session.time, 
            unit: this.session.practiceUnit
        };
    }



    private getWord(practiceUnit: any, wordlength: number): string{
        if(practiceUnit == 'oneSight') {
            this.session.wordcount += 1;
            return this.rnd.getRandomWord(wordlength);
        }
        else if(practiceUnit == 'jumpSight'){
            this.session.wordcount += 1;
            return this.rnd.getRandomWord(wordlength);            
        }
    }

    private initializeSettings(){
        
        if (this.session == undefined){
            
            let currentSessionLength;
            let currentWordLength;
            let currentTime;
            let currentUnit = this.getUnit();

            if( !this.leseruStatus.testSession.done && this.leseruStatus.testSession.status.level == 0 ){
                this.isTestSession = true;
                currentWordLength = this.testSessionStartWordLength;
                currentTime = this.testSessionStartTime;
                currentSessionLength = this.testSessionLength;
                currentUnit = unitEnum.ONESIGHT;
            } else if ( !this.leseruStatus.testSession.done ){

                this.isTestSession = true;
                currentWordLength = this.leseruStatus.testSession.status.wordlength;
                currentTime = this.testSessionStartTime;
                currentSessionLength = this.testSessionLength;
                currentUnit = (this.leseruStatus.testSession.status.level % 2 == 0)? unitEnum.ONESIGHT : unitEnum.JUMPSIGHT;                
                
            }else{
                currentWordLength = this.getSessionWordLength(currentUnit);
                currentTime = this.getSessionTime (currentUnit);
                currentSessionLength = this.regularSessionLength;
            }

            this.session = { 
                wordcount: 0, 
                practiceUnit:  currentUnit, 
                correct: 0, 
                sessionLength: currentSessionLength,
                wordlength: currentWordLength,
                time: currentTime
            };
        }
        this.sessionInitialized = true;
        return this.session;
    }



    private getSessionWordLength(currentUnit): number{
        return this.leseruStatus[currentUnit].wordlength;
    }

    private getLastCorrectPercentage(currentUnit): number{
        return this.leseruStatus[currentUnit].lastCorrectPercentage;
    }

    private getSessionTime(currentUnit): number{
        return this.leseruStatus[currentUnit].time;
    }
    
    private getUnit(){
        const levelOneSightRange = this.calcRange(this.leseruStatus.oneSight.level, this.leseruStatus.jumpSight.level);
        const randomNumber = Math.random() * 100;

        if( randomNumber >= levelOneSightRange ){
            return unitEnum.ONESIGHT;
        }else{
            return unitEnum.JUMPSIGHT;
        }
        
    }
    private calcRange( targetLevel, compareLevel){
        if(targetLevel > compareLevel){
            return 50 + this.getPercentageByLevelDiff( targetLevel - compareLevel);            
        }else if( targetLevel < compareLevel){
            return 50 - this.getPercentageByLevelDiff(compareLevel - targetLevel);
        }else{
            return 50;
        }
    }
    private getPercentageByLevelDiff( levelDiff ): number{

        switch(levelDiff){
            case 1:
                return 5;
            case 2:
                return 10;            
            case 3:
                return 15;
            case 4:
                return 20;            
            default:
                return 25;
        }

    }
}

