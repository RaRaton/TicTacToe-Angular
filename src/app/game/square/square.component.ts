import { Component, OnInit, Input } from '@angular/core';
import { StateService } from './../state.service';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})

export class SquareComponent implements OnInit {
  @Input() row: number;
  @Input() col: number;
  
  private _stateService:StateService;
  
  constructor(stateService:StateService) {
    this._stateService = stateService;
  }

  ngOnInit() {
  }

  _handlerSquareClick = function():void{
    console.log("Square (" + this.row + "," + this.col + ") was clicked");
    
    //call to update the value in the array
    this._stateService.updateValue(this.row, this.col);
  }
}
