import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'


export default class Flute extends Component {
  constructor() {
    super()
    this.state = {
      url: null,
      playing: true,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false
    }
    this.keypress = this.keypress.bind(this);
    this.removeTransition = this.removeTransition.bind(this);
    const keyboard = ['q', 'w', 'e', 'r', 't', 'y', 'h', 'j', 'k', 'l', 'v', 'b', 'i', 'o', 'p']
    keyboard.forEach(letter => {
      this[letter] = React.createRef();
      this[`${letter}2`] = React.createRef();
    })
    window.addEventListener('keydown', this.keypress);
    window.addEventListener('transitionend', this.removeTransition);
  }
  keypress(event) {
    const key = event.key
    if (['q', 'w', 'e', 'r', 't', 'y', 'h', 'j', 'k', 'l', 'v', 'b', 'i', 'o', 'p'].includes(key)) {
      this[`${key}2`].current.currentTime = 0
      this[`${key}2`].current.play();
      this[key].current.classList.add('playing')
    }
  }
  removeTransition(event) {
    event.target.classList.remove('playing')
  }
  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0
    })
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  stop = () => {
    this.setState({ url: null, playing: false })
  }
  toggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  toggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }
  setPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }
  onPlay = () => {
    this.setState({ playing: true })
  }
  onPause = () => {
    this.setState({ playing: false })
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  onProgress = state => {
    if (!this.state.seeking) {
      this.setState(state)
    }
  }
  onEnded = () => {
    this.setState({ playing: this.state.loop })
  }
  onDuration = (duration) => {
    this.setState({ duration })
  }
  // renderLoadButton = (url, label) => {
  //   return (
  //     <button onClick={() => this.load(url)}>
  //       {label}
  //     </button>
  //   )
  // }
  ref = player => {
    this.player = player
  }
  render() {
    const { url, playing, volume, muted, loop, played, playbackRate } = this.state
    return (
      <React.Fragment>
        <div className="keys">
          <div className="key" ref={this.q} >
            <kbd>F</kbd>
            <span className="sound" >Q</span>
          </div>
          <div className="key" ref={this.w} >
            <kbd>E</kbd>
            <span className="sound" >W</span>
          </div>
          <div className="key" ref={this.e} >
            <kbd>D</kbd>
            <span className="sound" >E</span>
          </div>
          <div className="key" ref={this.r} >
            <kbd>C</kbd>
            <span className="sound" >R</span>
          </div>
          <div className="key" ref={this.t} >
            <kbd>A#</kbd>
            <span className="sound" >T</span>
          </div>
          <div className="key" ref={this.y} >
            <kbd>A</kbd>
            <span className="sound" >Y</span>
          </div>
          <div className="key" ref={this.i} >
            <kbd>BAR</kbd>
            <span className="sound" >I</span>
          </div>
        </div>
        <div className="keys">
          <div className="key" ref={this.h} >
            <kbd>S1</kbd>
            <span className="sound" >H</span>
          </div>
          <div className="key" ref={this.j} >
            <kbd>S2</kbd>
            <span className="sound" >J</span>
          </div>
          <div className="key" ref={this.k} >
            <kbd>S3</kbd>
            <span className="sound" >K</span>
          </div>
          <div className="key" ref={this.l} >
            <kbd>S4</kbd>
            <span className="sound" >L</span>
          </div>
          <div className="key" ref={this.o} >
            <kbd>BAR</kbd>
            <span className="sound" >O</span>
          </div>
        </div>
        <div className="keys" >
          <div className="key" ref={this.v} >
            <kbd>K</kbd>
            <span className="sound" >V</span>
          </div>
          <div className="key" ref={this.b} >
            <kbd>SN</kbd>
            <span className="sound" >B</span>
          </div>
          <div className="key" ref={this.p} >
            <kbd>BAR</kbd>
            <span className="sound" >P</span>
          </div>
        </div>
        <audio src="./sounds/bell1.wav" ref={this.q2} />
        <audio src="./sounds/bell2.wav" ref={this.w2} />
        <audio src="./sounds/bell3.wav" ref={this.e2} />
        <audio src="./sounds/bell4.wav" ref={this.r2} />
        <audio src="./sounds/bell5.wav" ref={this.t2} />
        <audio src="./sounds/bell6.wav" ref={this.y2} />
        <audio src="./sounds/bellbar.wav" ref={this.i2} />
        <audio src="./sounds/synth1.wav" ref={this.h2} />
        <audio src="./sounds/synth2.wav" ref={this.j2} />
        <audio src="./sounds/synth3.wav" ref={this.k2} />
        <audio src="./sounds/synth4.wav" ref={this.l2} />
        <audio src="./sounds/synthbar.wav" ref={this.o2} />
        <audio src="./sounds/kick.wav" ref={this.v2} />
        <audio src="./sounds/snare.wav" ref={this.b2} />
        <audio src="./sounds/kickbar.wav" ref={this.p2} />

        <div className='player-wrapper'>
          <ReactPlayer
            ref={this.ref}
            // className='react-player'
            width='00%'
            height='00%'
            url={url}
            playing={playing}
            loop={loop}
            playbackRate={playbackRate}
            volume={volume}
            muted={muted}
            onReady={() => console.log('onReady')}
            onStart={() => console.log('onStart')}
            onPlay={this.onPlay}
            onPause={this.onPause}
            onBuffer={() => console.log('onBuffer')}
            onSeek={e => console.log('onSeek', e)}
            onEnded={this.onEnded}
            onError={e => console.log('onError', e)}
            onProgress={this.onProgress}
            onDuration={this.onDuration}
          />
        </div>
        <div className="player">
          <table ><tbody>
            <tr>
              <th className="text-left">Controls</th>
              <td>
                <button onClick={this.stop}>Stop</button>
                <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
                <button onClick={this.setPlaybackRate} value={1}>1</button>
                <button onClick={this.setPlaybackRate} value={1.5}>1.5</button>
                <button onClick={this.setPlaybackRate} value={2}>2</button>
              </td>
            </tr>
            <tr>
              <th className="text-left">Time</th>
              <td>
                <input
                  type='range' min={0} max={1} step='any'
                  value={played}
                  onMouseDown={this.onSeekMouseDown}
                  onChange={this.onSeekChange}
                  onMouseUp={this.onSeekMouseUp}
                />
              </td>
            </tr>
            <tr>
              <th className="text-left">Volume</th>
              <td>
                <input type='range' min={0} max={1} step='any' value={volume} onChange={this.setVolume} />
              </td>
            </tr>
            <tr>
              <th className="text-left">
                <label htmlFor='muted'>Muted</label>
              </th>
              <td>
                <input id='muted' type='checkbox' checked={muted} onChange={this.toggleMuted} />
              </td>
            </tr>
            <tr>
              <th className="text-left">
                <label htmlFor='loop'>Loop</label>
              </th>
              <td>
                <input id='loop' type='checkbox' checked={loop} onChange={this.toggleLoop} />
              </td>
            </tr>
          </tbody></table>
          <table><tbody>
            <tr>
              <th className="text-left">URL</th>
              <td>
                <input ref={input => { this.urlInput = input }} type='text' placeholder='Enter URL' />
                <button onClick={() => this.setState({ url: this.urlInput.value })}>Load</button>
              </td>
            </tr>
          </tbody></table>
        </div>

      </React.Fragment>
    )
  }
}
