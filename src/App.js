import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import brace from 'brace';
import generateRandom from 'sillyname';
import { split as SplitEditor} from 'react-ace';
import ToolBar from './Toolbar';
import './App.css';

//languages

import 'brace/mode/javascript';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/mode/typescript';
import 'brace/mode/scss';
import 'brace/mode/sql';
import 'brace/mode/text';


//themes
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/terminal';
import 'brace/theme/xcode';

// const socket = socketIOClient('http://192.168.1.19:4000');
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
      drawerToggle: false
    }

    if(window.location.pathname !== '/'){
      socket.emit('join', window.location.pathname)
    }

    socket.on('room', (room) => {
      this.setState({
        room: room
      })
    })

    socket.on('message', (code) => {
      this.setState({
        code: code
      })
    })

    socket.on('toolbar', (setting) => {
      if(setting.name == 'wordWrap'){
        this.setState((prevState) => {
          return {
            [setting.name]: !prevState.wordWrap
          }
        })
      }else{
        this.setState({
          [setting.name]: setting.value
        })
      }
    })
  }

  componentDidMount(){

    window.addEventListener('resize', ()=> this.throttle(console.log(window.innerHeight), 75))

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
    socket.emit('toolbar', {name: name, value: value})
  }

  toggleFunc = () => {
    this.setState((prevState) => {
        return {
            drawerToggle: !prevState.drawerToggle
        }
    })
  }

  render() {
    console.log(this.state.wordWrap)
    return (
      <div className="App">
        <ToolBar {...this.state} changeHandler={this.changeHandler} />
        <div onClick={this.toggleFunc} className={this.state.drawerToggle ? 'toggle' : 'toggle showham'}>
            {this.state.drawerToggle ? <span className='fade'>Close</span> : <span className='fadey'>Open</span>}
        </div>
        <SplitEditor
          mode={this.state.language}
          theme={this.state.theme}
          height="100vh"
          width="100%"
          splits={this.state.split <= 0 ? 1 : this.state.split}
          showPrintMargin={false}
          fontSize={+this.state.fontSize <= 0 ? 1 : +this.state.fontSize}
          className='split-editor-custom'
          orientation="beside"
          value={this.state.code}
          setOptions={{cursorStyle: "smooth"}}
          onChange={this.onChange}
          wrapEnabled={this.state.wordWrap}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
      />
      </div>
    );
  }
}

export default App;
