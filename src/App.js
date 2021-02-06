import React, {Component} from 'react';
//import TicTacToeField from './Components/TicTacToeField/tictactoe.component.jsx'
import { GameGrid } from './Components/game-grid/game-grid.component.jsx'
import './App.css';
import fields_data from './fields.json';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      fields: fields_data,
      turn: 'O',
      searchField: '',
      title: '',
      won: false,
      winner: "",
      winnerClass: "",
      stats: {
        wins_O: 0,
        wins_X: 0,
        draws: 0
      }
    }
    // Rule of Thumb use arrow function always when not a react function
    // Needed if we don't use ES6 arrow functions
    //this.handleChange = this.handleChange.bind(this); // setting the context of the "this keyword"
    this.onTick = this.onTick.bind(this)
  }

  onTick = (id) => {
    if(!this.state.won){
      let fid = id -1
      let fieldsState = this.state.fields.slice();
      if(fieldsState[fid].symbol === ""){
        let turn_sym = this.state.turn
        fieldsState[fid].symbol = turn_sym
        if( turn_sym === "O"){
          turn_sym = "X"
        }else{
          turn_sym = "O"
        }
      this.setState({fields: fieldsState, turn: turn_sym})
      this.checkWin()
    }
    }
  }

  checkWin = () => {
    let fields = this.state.fields.slice();
    for(let i = 1; i<= fields.length; i += 3){
        if (fields[i].symbol !== ""){
          if( fields[i-1].symbol === fields[i].symbol && fields[i].symbol === fields[i+1].symbol){
            this.updateScore(fields[i].symbol, i, "row");
          }
        }
    }
    for(let i = 0; i<= 2; i++){
      if (fields[i+3].symbol !== ""){
        if( fields[i].symbol === fields[i+3].symbol && fields[i+3].symbol === fields[i+6].symbol){
          this.updateScore(fields[i].symbol, i, "col");
        }
      }
    }
    if( fields[4].symbol !== ""){
      if( fields[0].symbol === fields[4].symbol && fields[4].symbol === fields[8].symbol){
        this.updateScore(fields[4].symbol, 4, "diag-left");
      }
      if( fields[2].symbol === fields[4].symbol && fields[4].symbol === fields[6].symbol){
        this.updateScore(fields[4].symbol, 4, "diag-right");
      }
    }

    //Check draw
    let draw = true;
    for(let i=0; i<9; i++){
      if(fields[i].symbol === ""){
        draw = false
      }
    }
    if(draw){
      this.updateScore("Draw")
    }
  }
  updateScore = (symbol, line, dir) => {
    if(symbol === "Draw"){
      console.log("Win for Team ", symbol)
      let stats = this.state.stats
      stats.draws += 1
      this.setState({won: true, winner: symbol, stats: stats})
    } else {
      console.log("Win for Team ", symbol)
      let stats = this.state.stats
      let index;
      if(dir === "row"){
        index = (line+2)/3
      }else if(dir === "col"){
        index = line + 1
      }else{
        index = line
      }
      let cross = `${dir}-general ${dir}-${index}-strike`;
      if ( symbol === "O"){
        stats.wins_O += 1
      }else{
        stats.wins_X += 1
      }
      this.setState({won: true, winner: symbol, stats: stats, winnerClass: cross})
    }
  }
  clearGameField = () =>{
    console.log(fields_data)
    let empty_board = fields_data.slice()
    if(this.state.won === true){
      for(let i=0; i < empty_board.length; i++){
        empty_board[i].symbol = ""
      }
      this.setState({fields: empty_board, won: false, winner: "", winnerClass: ""})
    }
  }

  render () {
    return (
      <div className="App">
        <div class="paper">
          <div class="lines">
            <div class="text">
              <h1>Tic Tac Toe</h1>
            </div>
            <div class="content">
              <GameGrid onTic={this.onTick} strikeClass={this.state.winnerClass} fields={this.state.fields}></GameGrid>
                {this.state.won === true &&
                  <button onClick={this.clearGameField} >Clear Field</button>
                }
            </div>
          </div>
          <div class="holes hole-top"></div>
          <div class="holes hole-middle"></div>
          <div class="holes hole-bottom"></div>
        </div>
      </div>
    );
  }
}

export default App;
