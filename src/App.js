import React, { Component } from 'react';

import './app.css';

class App extends Component {
  state = {
    work: 25,
    break: 5,
    seconds: 0,
    isBreak: false,
    interval: null,
    showModal: false,
    settings: {
      work: 25,
      break: 5
    }
  }

  play = () => {
    this.clearActive('.play')
    this.setState({
      showModal: false,
      interval: setInterval(() => {
                  this.setState({seconds: this.state.seconds - 1}, function() {
                    if(this.state.seconds < 0) {
                      this.state.isBreak ? this.setState({break: this.state.break - 1, seconds: 59}) : this.setState({work: this.state.work - 1, seconds: 59})
                    }
                  })
                }, 1000)
    })
    
  }

  pause = () => {
    this.setState({showModal: false})
    this.clearActive('.pause')
    clearInterval(this.state.interval)
  }

  stop = () => {
    this.clearActive('.stop')
    clearInterval(this.state.interval)
    this.setState({
      work: this.state.settings.work,
      break: this.state.settings.break,
      seconds: 0,
      interval: null,
      showModal: false
    })
  }

  fastForward = () => {
    clearInterval(this.state.interval)
    this.clearActive('.fast-forward')
    this.setState({isBreak: !this.state.isBreak, seconds: 0, work: this.state.settings.work, break: this.state.settings.break})
  }

  formatTime = (time) => {
    if(time < 10) {
      return "0"+time
    }
    return time
  }

  clearActive = (control) => {
    document.querySelectorAll('.control').forEach( control => {
      control.classList.remove('active')
    })
    control && document.querySelector(control).classList.add('active')
  }

  showModal = (bool) => {
    this.clearActive(bool ? '.settings' : '')
    const settings = {
      work: document.getElementById('work').value,
      break: document.getElementById('break').value
    }
    if(!bool) {
      if(settings.work && !settings.break) {
        this.setState({
          work: settings.work,
          seconds: 0,
          settings:{work: settings.work, break: this.state.settings.break}
        }, () => clearInterval(this.state.interval))
      } else if(!settings.work && settings.break) {
        this.setState({
          break: settings.break,
          seconds: 0,
          settings:{work: this.state.settings.work, break: settings.break}
        }, () => clearInterval(this.state.interval))
      } else if(settings.work && settings.break) {
        this.setState({
          work: settings.break,
          break: settings.break,
          seconds: 0,
          settings:{work: settings.work, break: settings.break}
        }, () => clearInterval(this.state.interval))
      }
    }
    this.setState({showModal: bool})
  }

  render() {
    return (
      <div className="App">
        <div className="time">
          <div className="min">
            {this.state.isBreak ? this.formatTime(this.state.break) : this.formatTime(this.state.work)}
          </div>
          <div className="sec">:
            {this.formatTime(this.state.seconds)}
          </div>
        </div>
        <div className="controls">
          <a href="https://github.com/ayushs08/pomodoro" target="_blank" className="code control misc"><i className="fal fa-code"></i></a>
          <div className="play control" onClick={this.play}><i className="fal fa-play"></i></div>
          <div className="pause control" onClick={this.pause}><i className="fal fa-pause"></i></div>
          <div className="stop control" onClick={this.stop}><i className="fal fa-stop"></i></div>
          <div className="fast-forward control" onClick={this.fastForward}><i className="fal fa-fast-forward"></i></div>
          <div className="settings control misc" onClick={() => this.showModal(true)}><i className="fal fa-cog"></i></div>
        </div>
        <div className={`settings-panel ${this.state.showModal ? '' : 'hidden'}`}>
          <div className="header">
            <div className="helper">Changes will be saved</div>
            <i className="fal fa-times close" onClick={() => this.showModal(false)}></i>
          </div>
          <div className="body">
            <div className="form-group">
              <input type="number" required id="work" />
              <label htmlFor="work">Work minutes</label>
            </div>
            <div className="form-group">
              <input type="number" required id="break" />
              <label htmlFor="break">Break minutes</label>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
