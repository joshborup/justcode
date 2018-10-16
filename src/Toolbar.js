import React, { Component } from 'react';

export default class ToolBar extends Component {

    render() {
        return (
            <div className={this.props.drawerToggle ? 'toolbar-container' : 'toolbar-container hide'}>
                <div>
                    <h1>Just Code</h1>
                    {/* <div className='pane-selection-container'>
                        <label>Notes Tab: </label>
                        <select name='split' onChange={(e) => this.props.changeHandler(e.target.name, e.target.value)} value={this.props.split}>
                            <option value='1'>hide</option>
                            <option value='2'>show</option>
                        </select>
                    </div> */}
                    
                    <div className='room-selection-container container'>
                        <label>Room: </label>
                        <input name='room' onChange={(e) => this.props.changeHandler(e.target.name, e.target.value)} value={this.props.room} />
                        <button onClick={() => window.location.pathname = this.props.room}>Join</button>
                    </div>

                    <div className='language-selection-container container'>
                        <label>Language: </label>
                        <select name='language' onChange={(e) => this.props.changeHandler(e.target.name, e.target.value)} value={this.props.language}>
                            <option value='javascript'>JavaScript</option>
                            <option value='html'>HTML</option>
                            <option value='css'>CSS</option>
                            <option value='scss'>SCSS</option>
                            <option value='sql'>SQL</option>
                            <option value='typescript'>TypeScript</option>
                            <option value='text'>Text</option>
                        </select>
                    </div>

                    <div className='language-selection-container container'>
                        <label>Theme: </label>
                        <select name='theme' onChange={(e) => this.props.changeHandler(e.target.name, e.target.value)} value={this.props.theme}>
                            <option value='monokai'>Monokai</option>
                            <option value='github'>Github</option>
                            <option value='terminal'>terminal</option>
                            <option value='xcode'>xCode</option>
                        </select>
                    </div>

                    <div className='font-size-container container'>
                        <label>Font Size: </label>
                        <input type='number' name='fontSize' onChange={(e) => this.props.changeHandler(e.target.name, e.target.value)} value={this.props.fontSize} />
                    </div>

                    <div className='wordWrap-container container'>
                        <label>Word Wrap: </label>
                        <input type='checkbox' name='wordWrap' onChange={(e) => this.props.changeHandler(e.target.name, e.target.value)} value={this.props.wordWrap} />
                    </div>
                </div>
            </div>
        );
    }
}