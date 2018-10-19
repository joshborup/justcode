import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import brace from 'brace';
import generateRandom from 'sillyname';
// import { split as SplitEditor} from 'react-ace';
import AceEditor from 'react-ace';
import ToolBar from './Toolbar';
import 'brace/ext/language_tools';
import './App.css';

//languages

import 'brace/mode/javascript';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/mode/typescript';
import 'brace/mode/scss';
import 'brace/mode/sql';
import 'brace/mode/text';
import 'brace/mode/mysql';
import 'brace/mode/php';
import 'brace/mode/python';
import 'brace/mode/java';
import 'brace/mode/pgsql';
import 'brace/mode/csharp';
import 'brace/mode/markdown';



//themes
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/terminal';
import 'brace/theme/xcode';
import 'brace/theme/clouds_midnight';
import 'brace/theme/eclipse';
import 'brace/theme/ambiance';
import 'brace/theme/cobalt';

// const socket = socketIOClient('http://localhost:4000');
const socket = socketIOClient();

class App extends Component {
  constructor(){
    super()
    this.state = {
      code:'',
      split:1,
      language: 'javascript',
      room:'',
      fontSize:16,
      theme: 'monokai',
      wordWrap: false,
      drawerToggle: false,
      tabSize: 4,
      enableLiveAutocompletion:false
    }

    if(window.location.pathname !== '/' && window.location.pathname !== ''){
      socket.emit('join', window.location.pathname)
    }

    socket.on('room', (room) => {
      console.log(room)
      this.setState({
        room: room
      })
    })

    socket.on('message', (code) => {
      this.setState({
        code: code.value,
        room: code.room
      })
    })

    // socket.on('toolbar', (setting) => {
    //   if(setting.name == 'wordWrap'){
    //     this.setState((prevState) => {
    //       return {
    //         [setting.name]: !prevState.wordWrap
    //       }
    //     })
    //   }else{
    //     this.setState({
    //       [setting.name]: setting.value
    //     })
    //   }
    // })
  }

  componentDidMount(){
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can add to home screen
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          deferredPrompt = null;
        });
    });

    // window.addEventListener('resize', ()=> this.throttle(console.log(window.innerHeight), 75))

    if(window.location.pathname === '/'){
      window.location.pathname = `/${generateRandom().split(' ').join('')}`
    }
  }

  throttle(fn, wait) {
    var time = Date.now();
    return function() {
      if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    }
  }

  onChange = (newValue) => {
      socket.emit('message', {newValue, room: this.state.room})
  }

  changeHandler = (name, value) => {
    // socket.emit('toolbar', {name: name, value: value, room: this.state.room})
    console.log(name, value)
    this.setState({
      [name]: value
    })
  }

  roomChangeHandler = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  toggleFunc = () => {
    this.setState((prevState) => {
        return {
            drawerToggle: !prevState.drawerToggle
        }
    })
  }



  render() {
    
    return (
      <div className="App">
        <ToolBar {...this.state} roomChangeHandler={this.roomChangeHandler} changeHandler={this.changeHandler} />
        <div onClick={this.toggleFunc} className={this.state.drawerToggle ? 'toggle' : 'toggle showham'}>
          <div className={this.state.drawerToggle ? 'closes' : 'opens'}>
            <span className={this.state.drawerToggle ? 'bar close one' : 'bar open one'}></span>
            <span className={this.state.drawerToggle ? 'bar close two' : 'bar open two'}></span>
            <span className={this.state.drawerToggle ? 'bar close three' : 'bar open three'}></span>
          </div>
        </div>
        <AceEditor
          mode={this.state.language}
          theme={this.state.theme}
          height="100vh"
          width="100%"
          
          showPrintMargin={false}
          fontSize={+this.state.fontSize <= 0 ? 1 : +this.state.fontSize}
          className='split-editor-custom'
          orientation="beside"
          // possibly to fix stepping on eachother issue
          value={this.state.code}
          setOptions={{cursorStyle: "smooth", enableLiveAutocompletion: this.state.enableLiveAutocompletion}}
          onChange={this.onChange}
          wrapEnabled={this.state.wordWrap}
          name="UNIQUE_ID_OF_DIV"
          tabSize={+this.state.tabSize <= 0 ? 1 : +this.state.tabSize}
          editorProps={{$blockScrolling: true}}
      />
      </div>
    );
  }
}

export default App;
