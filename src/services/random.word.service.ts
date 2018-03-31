import { Injectable } from '@angular/core';

@Injectable()
/** Dummy version of an authenticated user service */
export class RandomWordService {

  public getRandomWord( wlength: number ): string{
    return this.generate(wlength);
  }

  private generate( wLength: number): string{
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZÖÄÜßabcdefghijklmnopqrstuvwxyzöäü";
    const firstLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const constants = "bcdfghjklmnpqrstvwxyzß";
    const vocal = "aeiouaeiouöäü";
    
    // first to letters
    var text = firstLetter.charAt(Math.floor(Math.random() * firstLetter.length));
    if( constants.indexOf( text.charAt(0).toLowerCase() ) ){
      text += vocal.charAt(Math.floor(Math.random() * vocal.length));      
    }else{
      text += constants.charAt(Math.floor(Math.random() * constants.length));
    }
    
    for (var i = 0; i < wLength - 2; i++){
      if( constants.indexOf(text.charAt(text.length-1).toLowerCase()) > -1 && constants.indexOf(text.charAt(text.length-2).toLowerCase()) > -1 ){
        text += vocal.charAt(Math.floor(Math.random() * constants.length));        

      }else if(vocal.indexOf(text.charAt(text.length-1).toLowerCase()) > -1 && vocal.indexOf(text.charAt(text.length-2).toLowerCase()) > -1){
        text += constants.charAt(Math.floor(Math.random() * vocal.length));              

      }else{
        text += possible.charAt(Math.floor(Math.random() * possible.length)).toLowerCase();

      }
    }
  
    return text;
  }        
}

