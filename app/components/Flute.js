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
    const keyboard = ['a', 's', 'd', 'f', 'g', 'h', 'j']
    keyboard.forEach(letter => {
      this[letter] = React.createRef();
      this[`${letter}2`] = React.createRef();
    })
    window.addEventListener('keydown', this.keypress);
    window.addEventListener('transitionend', this.removeTransition);
  }
  keypress(event) {
    const key = event.key
    if (key) {
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
        <div>hello</div>
        <div className="keys">
          <div className="key" ref={this.a} >
            <kbd>C</kbd>
            <span className="sound" >A</span>
          </div>
          <div className="key" ref={this.s} >
            <kbd>D</kbd>
            <span className="sound" >S</span>
          </div>
          <div className="key" ref={this.d} >
            <kbd>E</kbd>
            <span className="sound" >D</span>
          </div>
          <div className="key" ref={this.f} >
            <kbd>F</kbd>
            <span className="sound" >F</span>
          </div>
          <div className="key" ref={this.g} >
            <kbd>G</kbd>
            <span className="sound" >G</span>
          </div>
          <div className="key" ref={this.h} >
            <kbd>A</kbd>
            <span className="sound" >H</span>
          </div>
          <div className="key" ref={this.j} >
            <kbd>B</kbd>
            <span className="sound" >J</span>
          </div>
        </div>
        <audio src="./sounds/fluteC.wav" ref={this.a2} />
        <audio src="./sounds/fluteD.wav" ref={this.s2} />
        <audio src="./sounds/fluteE.wav" ref={this.d2} />
        <audio src="./sounds/fluteF.wav" ref={this.f2} />
        <audio src="./sounds/fluteG.wav" ref={this.g2} />
        <audio src="./sounds/fluteA.wav" ref={this.h2} />
        <audio src="./sounds/fluteB.wav" ref={this.j2} />

        <div className='player-wrapper'>
          <ReactPlayer
            ref={this.ref}
            className='react-player'
            // width='100%'
            // height='100%'
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

        <table><tbody>
          <tr>
            <th>Controls</th>
            <td>
              <button onClick={this.stop}>Stop</button>
              <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
              <button onClick={this.setPlaybackRate} value={1}>1</button>
              <button onClick={this.setPlaybackRate} value={1.5}>1.5</button>
              <button onClick={this.setPlaybackRate} value={2}>2</button>
            </td>
          </tr>
          <tr>
            <th>Time</th>
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
            <th>Volume</th>
            <td>
              <input type='range' min={0} max={1} step='any' value={volume} onChange={this.setVolume} />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor='muted'>Muted</label>
            </th>
            <td>
              <input id='muted' type='checkbox' checked={muted} onChange={this.toggleMuted} />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor='loop'>Loop</label>
            </th>
            <td>
              <input id='loop' type='checkbox' checked={loop} onChange={this.toggleLoop} />
            </td>
          </tr>
        </tbody></table>
        <table><tbody>
          <tr>
            <th>URL</th>
            <td>
              <input ref={input => { this.urlInput = input }} type='text' placeholder='Enter URL' />
              <button onClick={() => this.setState({ url: this.urlInput.value })}>Load</button>
            </td>
          </tr>
        </tbody></table>

      </React.Fragment>
    )
  }
}
