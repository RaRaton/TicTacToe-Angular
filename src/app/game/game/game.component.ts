import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  headerText: string;
  
  constructor() { 
    this.headerText = "Turn of player 1 - Xs";
  }

  ngOnInit() {
  }

}
