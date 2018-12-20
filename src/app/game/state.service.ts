import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface State {
  turn: string,
  values: string[][],
  numMovs: number,
  winner: boolean
}

@Injectable({
  providedIn: 'root'
})

export class StateService {
  private _state$: BehaviorSubject<State>;
  
  constructor() { 
    this._state$ = new BehaviorSubject({
        turn: "PLAYERX",
        values: [
            ['-','-','-'],
            ['-','-','-'],
            ['-','-','-']
        ],
        numMovs: 0,
        winner: false
    });
  }
  
  get state$(): BehaviorSubject<State>{
    return this._state$;
  }
  
  get state(): State{
    return this._state$.getValue();
  }
  
  set state(currentState:State){
    this._state$.next(currentState);
  }
  
  updateValue(row: number, col: number): void{
    if ((this.state.winner === false ) && (this.state.values[row][col] === '-')){
        let newValue = this.state.turn === 'PLAYERX'? 'X': '0';
        let newTurn = this.state.turn === 'PLAYERX'? 'PLAYER0': 'PLAYERX';
        this.state.numMovs = this.state.numMovs + 1;
        this.state.values[row][col] = newValue;
        
        //Check if there is a winner when first player have more that 2 squares
        if (this.state.numMovs > 4){
            console.log(this.state.numMovs);
            //Horizontal
            if ((this.state.values[row][0] === this.state.values[row][1]) && 
                (this.state.values[row][1] === this.state.values[row][2]))
                this.state.winner = true;
                
            //Vertical
            else if ((this.state.values[0][col] === this.state.values[1][col]) && 
                (this.state.values[1][col] === this.state.values[2][col]))
                this.state.winner = true;
            
            //Diagonal
            else if ((this.state.values[0][0] === this.state.values[1][1]) && 
                (this.state.values[1][1] === this.state.values[2][2]))
                this.state.winner = true; 
            else if ((this.state.values[0][2] === this.state.values[1][1]) && 
                (this.state.values[1][1] === this.state.values[2][0]))
                this.state.winner = true; 
                
        }
        
        //Update turn to next player if it wasn't a winner
        if (!this.state.winner)
            this.state.turn = newTurn;
            
        this.state = this.state;
    };
  }
  
  reset(): void{
    this.state = {
        turn: "PLAYERX",
        values: [
            ['-','-','-'],
            ['-','-','-'],
            ['-','-','-']
        ],
        numMovs: 0,
        winner: false
    };
  }
}
