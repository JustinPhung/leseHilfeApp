import { Injectable } from "@angular/core";
import { Settings } from "./settings";

@Injectable()
export class TamagotchiService {

    private tamagotchi:any = { 
        birthDate: {},
        lastFed: {},
        lastPlayed: {},
        meal: {},
        play: {}
      }

    constructor( private settings: Settings ) {
        settings.load().then( () =>{
            settings.getValue("birthDate")
                .then(value => {
                    if(value === undefined ){
                        settings.setValue("birthDate", Date.now());
                    }else{
                        this.tamagotchi.birthDate = value;
                    }
                })
                .catch(() => console.log("error while load value"));
        });
    }

    //positive number is hungry since - negative means will be hungry in 
    public isHungry(): number {
        return 0;
    }

    //positive number is hungry since - negative means will be hungry in 
    public wantsPlay(): number {
        return 0;
    }
    //age
    public getAge(): number{
        const timeNow = Date.now();
        return (+timeNow) - (+this.tamagotchi.birthDate);
    }

    public getNextStatus(): string {

        let returnStatus = Status.HAPPY;
        let urgency = 0;

        //if urgency is the same the upper priority wins

        if( this.isHungry() > urgency ){
            returnStatus = Status.HUNGRY;
            urgency = this.isHungry();
        }

        if( this.wantsPlay() > urgency){
            returnStatus = Status.SAD;
            urgency = this.wantsPlay();            
        }

        return returnStatus
    }


}

enum Status {

    HAPPY = "happyBaby",
    HUNGRY = "sadBaby",
    SAD = "superSadBaby"
}