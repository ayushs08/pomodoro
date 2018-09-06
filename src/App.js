import React, { Component } from 'react';
import './app.css';

class App extends Component {
  state = {
    work: {
      min: 25,
      sec: 8
    },
    break: {
      min: 5,
      sec: 60
    }
  }

  render() {
    return (
      <div className="App">
        <div className="time">
          <div className="min">
            {
              this.state.work.min < 10 ? "0"+this.state.work.min : this.state.work.min
            }
          </div>
          <div className="sec">:
            {
              this.state.work.sec < 10 ? "0"+this.state.work.sec : this.state.work.sec
            }
          </div>
        </div>
        <div className="controls">
          <div className="play control" onClick={this.check}><i className="fal fa-play"></i></div>
          <div className="pause control"><i className="fal fa-pause"></i></div>
          <div className="stop control" onClick={this.reset}><i className="fal fa-stop"></i></div>
          <div className="code control"><i className="fal fa-code"></i></div>
          <div className="settings control"><i className="fal fa-cog"></i></div>
        </div>
      </div>
    )
  }
}

export default App;
