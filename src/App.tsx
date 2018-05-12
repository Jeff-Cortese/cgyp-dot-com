import * as React from 'react';
import { findDOMNode } from 'react-dom';
import './App.css';

class App extends React.Component {
  public componentDidMount() {
    this.setState({
      isPlaying: true
    });
  }

  public onAppClick() {
    const dodo: any = findDOMNode(this.refs.dodo);
    const state: any = this.state;
    if (state.isPlaying) {
      dodo.pause();
    } else {
      dodo.play();
    }

    this.setState({
      isPlaying: !state.isPlaying
    })
  }

  public render() {
    return (
      <div className="App" onClick={this.onAppClick.bind(this)}>
        <h1 className="App-title">Come Get Your Podcast</h1>

        <p className="App-intro">
          <img src="hamster2.gif" title="Adam" alt="Adam"/>
          <img src="hamster3.gif" title="Dustin" alt="Dustin"/>
          <img src="hamster4.gif" title="Chris" alt="Chris"/>
        </p>

        <audio ref="dodo" autoPlay={true} loop={true}>
          <source src="dodo.wav" type="audio/wav"/>
        </audio>
      </div>
    );
  }
}

export default App;
