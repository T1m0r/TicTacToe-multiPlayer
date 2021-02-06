import React, {Component} from 'react';
import firebase from 'firebase';
import { GameGrid } from './Components/game-grid/game-grid.component.jsx'
import './App.css';
import config from './config.js'

class App extends Component {
  constructor (props) {
    super(props);
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
   }else {
      firebase.app(); // if already initialized, use that one
   }

    this.state = {
      fields: [],
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
    this.onTick = this.onTick.bind(this)
  }

  onTick = (id) => {
    //firebase.database().ref('/').set(this.state);
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
      this.setState({fields: fieldsState, turn: turn_sym}, () => {
        firebase.database().ref('/').set(this.state);
      });
      this.checkWin()
    }
    }
  }
  componentDidMount() {
    let ref = firebase.database().ref('/');
    ref.on('value', snapshot => {
      const state = snapshot.val();
      this.setState(state, () =>{
        this.checkWin();
      });
    });
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
    console.log(this.state.fields.slice())
    let empty_board = this.state.fields.slice()
    if(this.state.won === true){
      for(let i=0; i < empty_board.length; i++){
        empty_board[i].symbol = ""
      }
      this.setState({fields: empty_board, won: false, winner: "", winnerClass: ""}, () => {
        firebase.database().ref('/').set(this.state);
      });
    }
  }

  render () {
    return (
      <div className="App">
        <div class="paper">
          <div class="lines">
            <div class="text">
              <h1 class="heading">Tic Tac Toe</h1>
              {this.state.won === false &&
                <p class="turn-indicator">It is {this.state.turn}'s turn</p>
              }
            </div>
            <div class="content">
              <GameGrid onTic={this.onTick} strikeClass={this.state.winnerClass} fields={this.state.fields}></GameGrid>
                {this.state.won === true &&
                  <button class="btn-clearField" onClick={this.clearGameField} >Clear Field</button>
                }
              <div class="stats">
                <h1>Stats</h1>
                <h3>O-wins: {this.state.stats.wins_O}</h3>
                <h3>X-wins: {this.state.stats.wins_X}</h3>
                <h3>Draws: {this.state.stats.draws}</h3>
              </div>
            </div>
          </div>
          <div class="holes hole-top"></div>
          <div class="holes hole-middle"></div>
          <div class="holes hole-bottom"></div>
        </div>
        <footer class="footer">
          <p>@T1m0r 2021</p>
        </footer>
      </div>
    );
  }
}

export default App;
