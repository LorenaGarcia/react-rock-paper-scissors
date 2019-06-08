import React, { Component } from "react";
import ReactDOM from "react-dom";
import "../assets/css/App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.getMovement = this.getMovement.bind(this);
    this.optionClicked = this.optionClicked.bind(this);
    this.startGame = this.startGame.bind(this);
    this.state = {
      gameUser: "",
      gameComputer: "",
      countUser: 0,
      countComputer: 0,
      user: 0,
      computer: 0,
      games: [],
      timeline: []
    };
  }

  getMovement(games) {
    let userGames = games.join("").toUpperCase();
    return fetch(`https://smartplay.afiniti.com/v1/play/${userGames}`);
  }

  optionClicked(option) {
    const { games } = this.state;
    this.setState({
      games: [...games, option]
    });

    this.startGame(option);
  }

  async startGame(userOption) {
    let { games } = this.state;
    let response = await this.getMovement(games);
    let data = await response.json();
    let computer = data.nextBestMove;
    let game = userOption + computer;

    const { timeline } = this.state;

    let match = {
      user: userOption.toLowerCase(),
      computer: computer.toLowerCase()
    };
    this.setState({ timeline: [match, ...timeline] });

    console.log(timeline);

    switch (game) {
      case "RS":
      case "PR":
      case "SP":
        this.calcResult("W");
        break;
      case "RR":
      case "PP":
      case "SS":
        this.calcResult("T");
        break;
      default:
        this.calcResult("L");
    }
  }

  calcResult(win) {
    if (win === "W") {
      this.setState({
        countUser: this.state.countUser + 1
      });
    } else if (win === "T") {
      this.setState({
        countUser: this.state.countUser + 1,
        countComputer: this.state.countComputer + 1
      });
    } else {
      this.setState({
        countComputer: this.state.countComputer + 1
      });
    }
  }

  render() {
    const { timeline } = this.state;

    return (
      <div className="App">
        <header className="title-header">
          <h1>Rock, Paper & Scissors</h1>
        </header>

        <div className="options">
          <button
            className="button"
            onClick={() => {
              this.optionClicked("R");
            }}
          >
            <img className="image-button" src="/assets/images/rock.png" />
          </button>
          <button
            className="button"
            onClick={() => {
              this.optionClicked("P");
            }}
          >
            <img className="image-button" src="/assets/images/paper.png" />
          </button>
          <button
            className="button"
            onClick={() => {
              this.optionClicked("S");
            }}
          >
            <img className="image-button" src="/assets/images/scissors_2.png" />
          </button>
        </div>

        <div className="results">
          <div>
            <table>
              <tbody>
                <tr>
                  <th>Me</th>
                  <th />
                  <th>CPU</th>
                </tr>
                <tr className="results-number">
                  <th>{this.state.countUser}</th>
                  <th>-</th>
                  <th>{this.state.countComputer}</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="timeline">
          {timeline.map((val, key) => (
            <div className="match" key={key}>
              <div className="div1">
                <img
                  className="image-timeline"
                  src={`assets/images/mini-${val.user}.png`}
                />
              </div>
              <div className="div2">
                <div />
              </div>
              <div className="div3">
                <img
                  className="image-timeline"
                  src={`assets/images/mini-${val.computer}.png`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
let container = document.getElementById("app");
let component = <App />;

ReactDOM.render(component, container);
