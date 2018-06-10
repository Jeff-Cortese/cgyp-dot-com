import * as React from 'react';
import { Subject, timer } from 'rxjs';
import { tap, takeUntil, withLatestFrom } from 'rxjs/operators';

import './App.css';
import { ComponentLifeCycle } from './ComponentLifyCycle';

interface IAppState {
  isPlaying: boolean;
}

const log = console.log; // TODO get logging library

class Thing extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);

    const lifeCycle = new ComponentLifeCycle(this);
    lifeCycle.willMount$.pipe(
      tap(() => {
        log('test');
      }),
      takeUntil(lifeCycle.willUnmount$)
    ).subscribe(() => {}, () => {}, () => log('complete'));
  }

  public componentWillMount() {
    log('will mount')
  }

  public render() {
    return (<div>yo</div>)
  }
}

class App extends React.Component<{}, IAppState> {
  private dodo: HTMLAudioElement;
  private things: any[] = [];

  public onAppClick = () => {
    this.things.push({});

    const { isPlaying } = this.state;
    if (isPlaying) {
      this.dodo.pause();
    } else {
      this.dodo.play();
    }

    this.setState({
      isPlaying: !isPlaying
    });
  }

  public setDodo = (el: HTMLAudioElement) => {
    this.dodo = el;
  }

  public componentDidMount() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); // TODO move elsewhere
    this.setState({
      isPlaying: !isMobile
    });
  }

  public render() {
    const isPlaying = this.state && this.state.isPlaying
    return (
      <div className="App" onClick={this.onAppClick}>
        {this.things.map((thing, i) => <Thing key={i}/>)}
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
