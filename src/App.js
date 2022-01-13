import React from 'react';
import './App.css';

const drumPads = [
  {
    drumName: "bass-drum",
    keyTrigger: "Q",
    url: "https://res.cloudinary.com/bellatrixxie/video/upload/v1640866434/Drum%20Machine%20audio/371192__karolist__acoustic-kick_mtjwrp.wav"
  },
  {
    drumName: "snare-drum",
    keyTrigger: "W",
    url: "https://res.cloudinary.com/bellatrixxie/video/upload/v1640866757/Drum%20Machine%20audio/410514__inspectorj__snare-drum-single-hit-a-h1_uhe3kl.wav"
  },
  {
  drumName: "floor-tom",
    keyTrigger: "E",
    url: "https://res.cloudinary.com/bellatrixxie/video/upload/v1640866724/Drum%20Machine%20audio/521704__mixmasterdylan__floortom_clxol7.wav"
  },
  {
  drumName: "first-tom-tom",
    keyTrigger: "A",
    url: "https://res.cloudinary.com/bellatrixxie/video/upload/v1640866713/Drum%20Machine%20audio/511398__pjhedman__se2-tom_jyauao.wav"
  },
  {
  drumName: "second-tom-tom",
    keyTrigger: "S",
    url: "https://res.cloudinary.com/bellatrixxie/video/upload/v1640866768/Drum%20Machine%20audio/184534__altemark__tom3_t81cu5.wav"
  },
  {
  drumName: "hi-hat",
    keyTrigger: "D",
    url: "https://res.cloudinary.com/bellatrixxie/video/upload/v1640866809/Drum%20Machine%20audio/165321__ani-music__echoed-hi-hats_ouiba2.wav"
  },
  {
  drumName: "crash-cymbal",
    keyTrigger: "Z",
    url: "https://res.cloudinary.com/bellatrixxie/video/upload/v1640866822/Drum%20Machine%20audio/538194__eliot-beats__cymbal-crash_hak5vb.mp3"
  },
  {
  drumName: "bongo",
    keyTrigger: "X",
    url: "https://res.cloudinary.com/bellatrixxie/video/upload/v1640867116/Drum%20Machine%20audio/99754__menegass__bongo4_yvmups.wav"
  },
  {
  drumName: "steel-drum",
    keyTrigger: "C",
    url: "https://res.cloudinary.com/bellatrixxie/video/upload/v1640866879/Drum%20Machine%20audio/145460__soughtaftersounds__menu-click-steel-drum_bf1k5t.mp3"
  }
]

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      display: "..."
    }
    this.handleClick = this.handleClick.bind(this)
    this.setAudioFiles = this.setAudioFiles.bind(this)
    // this.logState = this.logState.bind(this)
  }
  setAudioFiles() {
    console.log("setAudioFiles working")
    drumPads.map(drum => document.getElementById(drum.keyTrigger).setAttribute("src", drum.url))
    // I moved this to the DrumComponent in order to access the audio elements,
    // then moved it back when I realised I can access them from here, since they will render in the DOM.
    // Same for componentDidMount()
  }
  componentDidMount() {
    this.setAudioFiles() 
    document.addEventListener('keypress', (e) => {
    // I used 'keypress' instead of 'keydown' to avoid error when pressing F12
      const id = e.key.toUpperCase()
      console.log(id)
      document.getElementById(id).play()
      drumPads.map(drum => {
        let displayDrum
        return (
          drum.keyTrigger === id &&
          (displayDrum = drum.drumName.replace(/-/g," ")) &&
          this.setState({display: displayDrum})
        )
      })
    })
  }
  handleClick(e) {
    console.log("handleClick working!")
    drumPads.map(drum => {
      let displayDrum
      return (
        drum.drumName === e.target.id && 
    document.getElementById(drum.keyTrigger).play() && 
    (displayDrum = drum.drumName.replace(/-/g," ")) &&
    this.setState({display: displayDrum})
    )})
  }
  // logState() {
  //   console.log(this.state)
  // }
  render() {
    return (
      <div id="drum-machine">
        <h1 id="heading">Drum Machine</h1>
        <div id="display-div">
          <h4 id="display">{this.state.display}</h4>
        </div>
        <div id="drum-container">
          <DrumComponent handleClick={this.handleClick} keyTrigger="Q" drumName="bass-drum" />
          <DrumComponent handleClick={this.handleClick} keyTrigger="W" drumName="snare-drum" />
          <DrumComponent handleClick={this.handleClick} keyTrigger="E" drumName="floor-tom" />
          <DrumComponent handleClick={this.handleClick} keyTrigger="A" drumName="first-tom-tom" />
          <DrumComponent handleClick={this.handleClick} keyTrigger="S" drumName="second-tom-tom" />
          <DrumComponent handleClick={this.handleClick} keyTrigger="D" drumName="hi-hat" />
          <DrumComponent handleClick={this.handleClick} keyTrigger="Z" drumName="crash-cymbal" />
          <DrumComponent handleClick={this.handleClick} keyTrigger="X" drumName="bongo" />
          <DrumComponent handleClick={this.handleClick} keyTrigger="C" drumName="steel-drum" />
        </div>
        {/* <button onClick={this.logState}>Log State</button> */}
      </div>
    )
  }
}

const DrumComponent = (props) => {
    return (
      <button 
      className="drum-pad"
      onClick={props.handleClick}
      crossOrigin="anonymous"
      id={props.drumName}>
      {props.keyTrigger}
      <audio  
        className="clip"
        id={props.keyTrigger}
      >
      </audio>
    </button>
    )
}

export default App;
