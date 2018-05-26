import * as React from 'react';
import './App.css';

interface IAppState {
  isPlaying: boolean;
}

class App extends React.Component<{}, IAppState> {
  public log = console.log;
  private dodo: HTMLAudioElement;

  public onAppClick = () => {
    const { isPlaying } = this.state;
    if (isPlaying) {
      this.dodo.pause();
    } else {
      this.dodo.play();
    }

    this.setState({
      isPlaying: !isPlaying
    })
  }

  public setDodo = (el: HTMLAudioElement) => {
    this.dodo = el;
  }

  public componentDidMount() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    this.setState({
      isPlaying: !isMobile
    });
  }

  public render() {
    return (
      <div className="App" onClick={this.onAppClick}>
        <h1 className="App-title">Come Get Your Podcast</h1>

        <p className="App-intro">
          <img src="hamster2.gif" title="Adam" alt="Adam"/>
          <img src="hamster3.gif" title="Dustin" alt="Dustin"/>
          <img src="hamster4.gif" title="Chris" alt="Chris"/>
        </p>

        <audio ref={this.setDodo} autoPlay={true} loop={true}>
          <source src="dodo.wav" type="audio/wav"/>
        </audio>
      </div>
    );
  }
}

export default App;
