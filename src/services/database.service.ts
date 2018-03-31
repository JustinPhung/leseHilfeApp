import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite";

@Injectable()
export class DatabaseService {

    private tamagotchi:any;

    constructor(private sqlite: SQLite) {
        //run on simulator or advice
        this.sqlite.create({
            name: 'ionicdb.db',
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('CREATE TABLE IF NOT EXISTS tamagotchi(rowid INTEGER PRIMARY KEY, birthDate TEXT, lastFed TEXT, lastPlayed TEXT, meal TEXT, play TEXT)', {})
            .then(res => console.log('Executed SQL'))
            .catch(e => console.log(e));
            db.executeSql('SELECT * FROM tamagotchi ORDER BY rowid DESC LIMIT 1', {})
            .then(res => {
                this.tamagotchi = { 
                    birthDate:res.birthDate,
                    lastFed:res.lastFed,
                    lastPlayed:res.lastPlayed,
                    meal:res.meal,
                    play:res.play
                  };
            })
            .catch(e => console.log(e));
        }).catch(e => console.log(e));        
    }
}